#!/usr/bin/env python
# coding:utf-8
# +-------------------------------------------------------------------
# |  宝塔Linux面板
# +-------------------------------------------------------------------
# | Copyright (c) 2015-2016 宝塔软件(http://bt.cn) All rights reserved.
# +-------------------------------------------------------------------
# | Author: hwliang <hwl@bt.cn>
# +-------------------------------------------------------------------
import json
import os
import pathlib
import pwd
import re
import shutil
import sys
import time
import html
import datetime
import urllib
from typing import Callable, Tuple, Union

import public
# from BTPanel import session, request
import traceback

from flask import request

import crontab
import json
import zipfile
import stat

try:
    import chardet
except:
    os.system('btpip install chardet')
    try:
        import chardet
    except:
        chardet = None


class files:
    run_path = None
    download_list = None
    download_is_rm = None
    recycle_list = []
    download_token_list = None
    file_map = {
        'images': ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'ico', 'JPG', 'webp'],
        'compress': ['zip', 'rar', 'gz', 'war', 'tgz', 'tar', '7z'],
        'video': ['mp4', 'mp3', 'mpeg', 'mpg', 'mov', 'avi', 'webm', 'mkv', 'mkv', 'mp3', 'rmvb', 'wma', 'wmv'],
        'ont_text': ['iso', 'xlsx', 'xls', 'doc', 'docx', 'tiff', 'exe', 'so', 'bz', 'dmg', 'apk', 'pptx', 'ppt',
                     'xlsb',
                     'pdf']
    }

    # 检查敏感目录

    def CheckDir(self, path):
        path = path.replace('//', '/')
        if path[-1:] == '/':
            path = path[:-1]

        nDirs = ('',
                 '/',
                 '/*',
                 '/www',
                 '/root',
                 '/boot',
                 '/bin',
                 '/etc',
                 '/home',
                 '/dev',
                 '/sbin',
                 '/var',
                 '/usr',
                 '/tmp',
                 '/sys',
                 '/proc',
                 '/media',
                 '/mnt',
                 '/opt',
                 '/lib',
                 '/srv',
                 '/selinux',
                 '/www/server',
                 '/www/server/data',
                 '/www/.Recycle_bin',
                 public.GetConfigValue('logs_path'),
                 public.GetConfigValue('setup_path'))

        return not path in nDirs

    def CheckDelete(self, path):
        # 系统目录
        system_dir = {
            '/proc': '系统进程目录',
            '/dev': '系统设备目录',
            '/sys': '系统调用目录',
            '/tmp': '系统临时文件目录',
            '/var/log': '系统日志目录',
            '/var/run': '系统运行日志目录',
            '/var/spool': '系统队列目录',
            '/var/lock': '系统锁定目录',
            '/var/mail': '系统邮件目录',
            '/mnt': '系统挂载目录',
            '/media': '系统多媒体目录',
            '/dev/shm': '系统共享内存目录',
            '/lib': '系统动态库目录',
            '/lib64': '系统动态库目录',
            '/lib32': '系统动态库目录',
            '/usr/lib': '系统动态库目录',
            '/usr/lib64': '系统动态库目录',
            '/usr/local/lib': '系统动态库目录',
            '/usr/local/lib64': '系统动态库目录',
            '/usr/local/libexec': '系统动态库目录',
            '/usr/local/sbin': '系统脚本目录',
            '/usr/local/bin': '系统脚本目录'
        }
        # 面板系统目录
        bt_system_dir = {
            public.get_panel_path(): '宝塔主程序目录',
            '/www/server/data': 'MySQL数据库默认数据目录',
            '/www/server/mysql': 'MySQL程序目录',
            '/www/server/redis': 'Redis程序目录',
            '/www/server/mongodb': 'MongoDB程序目录',
            '/www/server/nvm': 'PM2/NVM/NPM程序目录',
            '/www/server/pass': '网站BasicAuth认证密码存储目录',
            '/www/server/speed': '网站加速数据目录',
            '/www/server/docker': 'Docker插件程序与数据目录',
            '/www/server/total': '网站监控报表数据目录',
            '/www/server/btwaf': 'WAF防火墙数据目录',
            '/www/server/pure-ftpd': 'ftp程序目录',
            '/www/server/phpmyadmin': 'phpMyAdmin程序目录',
            '/www/server/rar': 'rar扩展库目录，删除后将失去对RAR压缩文件的支持',
            '/www/server/stop': '网站停用页面目录,请勿删除!',
            '/www/server/nginx': 'Nginx程序目录',
            '/www/server/apache': 'Apache程序目录',
            '/www/server/cron': '计划任务脚本与日志目录',
            '/www/server/php': 'PHP目录，所有PHP版本的解释器都在此目录下',
            '/www/server/tomcat': 'Tomcat程序目录',
            '/www/php_session': 'PHP-SESSION隔离目录',
        }
        # 面板系统目录
        # bt_system_file_type = {
        #     '.sh': 'shell 程序',
        #     '.py': 'python 程序',
        #     '.pl': 'pl',
        #     '.html': 'html',
        # }
        if system_dir.get(path):
            return f"此为 [{system_dir.get(path)}] 不可删除！"

        msg = bt_system_dir.get(path)
        if msg:
            return f"此为 [{msg}] 删除可能导致面板程序崩溃，如需删除请正常卸载！"
        return None

    # 网站文件操作前置检测
    def site_path_check(self, get):
        try:
            if not 'site_id' in get:
                return True
            if not self.run_path:
                self.run_path, self.path, self.site_name = self.GetSiteRunPath(
                    get.site_id)
            if 'path' in get:
                if get.path.find(self.path) != 0:
                    return False
            if 'sfile' in get:
                if get.sfile.find(self.path) != 0:
                    return False
            if 'dfile' in get:
                if get.dfile.find(self.path) != 0:
                    return False
            return True
        except:
            return True

    # 网站目录后续安全处理
    def site_path_safe(self, get):
        try:
            if not 'site_id' in get:
                return True
            run_path, path, site_name = self.GetSiteRunPath(get.site_id)
            if not os.path.exists(run_path):
                os.makedirs(run_path)
            ini_path = run_path + '/.user.ini'
            if os.path.exists(ini_path):
                return True
            sess_path = '/www/php_session/%s' % site_name
            if not os.path.exists(sess_path):
                os.makedirs(sess_path)
            ini_conf = '''open_basedir={}/:/tmp/:/proc/:{}/
session.save_path={}/
session.save_handler = files'''.format(path, sess_path, sess_path)
            public.writeFile(ini_path, ini_conf)
            public.ExecShell("chmod 644 %s" % ini_path)
            public.ExecShell("chdir +i %s" % ini_path)
            return True
        except:
            return False

    # 取当站点前运行目录
    def GetSiteRunPath(self, site_id):
        try:
            find = public.M('sites').where(
                'id=?', (site_id,)).field('path,name').find()
            siteName = find['name']
            sitePath = find['path']
            if public.get_webserver() == 'nginx':
                filename = public.get_vhost_path() + '/nginx/' + siteName + '.conf'
                if os.path.exists(filename):
                    conf = public.readFile(filename)
                    rep = r'\s*root\s+(.+);'
                    tmp1 = re.search(rep, conf)
                    if tmp1:
                        path = tmp1.groups()[0]
            else:
                filename = public.get_vhost_path() + '/apache/' + siteName + '.conf'
                if os.path.exists(filename):
                    conf = public.readFile(filename)
                    rep = r'\s*DocumentRoot\s*"(.+)"\s*\n'
                    tmp1 = re.search(rep, conf)
                    if tmp1:
                        path = tmp1.groups()[0]
            return path, sitePath, siteName
        except:
            return sitePath, sitePath, siteName

    # 检测文件名
    def CheckFileName(self, filename):
        nots = ['\\', '&', '*', '|', ';', '"', "'", '<', '>']
        if filename.find('/') != -1:
            filename = filename.split('/')[-1]
        for n in nots:
            if n in filename:
                return False
        return True

    # 名称输出过滤
    def xssencode(self, text):
        list = ['<', '>']
        ret = []
        for i in text:
            if i in list:
                i = ''
            ret.append(i)
        str_convert = ''.join(ret)
        text2 = html.escape(str_convert, quote=True)

        reps = {'&amp;': '&'}
        for rep in reps.keys():
            if text2.find(rep) != -1: text2 = text2.replace(rep, reps[rep])
        return text2

    # 名称输入系列化
    def xssdecode(self, text):
        try:
            cs = {"&quot": '"', "&#x27": "'"}
            for c in cs.keys():
                text = text.replace(c, cs[c])

            str_convert = text
            text2 = html.unescape(str_convert)
            return text2
        except:
            return text

    # 上传文件
    def UploadFile(self, get):
        from BTPanel import request
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if not os.path.exists(get.path):
            os.makedirs(get.path)
        f = request.files['zunfile']
        filename = os.path.join(get.path, f.filename)
        if sys.version_info[0] == 2:
            filename = filename.encode('utf-8')
        s_path = get.path
        if os.path.exists(filename):
            s_path = filename
        p_stat = os.stat(s_path)
        f.save(filename)
        os.chown(filename, p_stat.st_uid, p_stat.st_gid)
        os.chmod(filename, p_stat.st_mode)
        public.WriteLog('TYPE_FILE', 'FILE_UPLOAD_SUCCESS',
                        (filename, get['path']))
        return public.returnMsg(True, 'FILE_UPLOAD_SUCCESS')

    def f_name_check(self, filename):
        '''
            @name 文件名检测2
            @author hwliang<2021-03-16>
            @param filename<string> 文件名
            @return bool
        '''
        f_strs = [';', '&', '<', '>']
        if not filename:
            return False
        for fs in f_strs:
            if filename.find(fs) != -1:
                return False
        return True

    # 上传前检查文件是否存在
    def upload_file_exists(self, args):
        '''
            @name 上传前检查文件是否存在
            @author hwliang<2021-11-3>
            @param filename<string> 文件名
            @return dict
        '''
        filename = args.filename.strip()
        try:
            filename = filename.encode('utf-8').decode('latin-1')
        except UnicodeEncodeError:
            return public.returnMsg(False, '文件名包含非法字符')

        if not os.path.exists(filename):
            return public.returnMsg(False, '指定文件不存在')
        file_info = {}
        _stat = os.stat(filename)
        file_info['size'] = _stat.st_size
        file_info['mtime'] = int(_stat.st_mtime)
        file_info['isfile'] = os.path.isfile(filename)
        return public.returnMsg(True, file_info)
    
    # 上传前批量检查文件是否存在
    def upload_files_exists(self, args):
        '''
            @name 上传前批量检查文件是否存在
            @param files<string> 文件列表,多个用\n分隔
            @return dict
        '''
        check_files = []
        if hasattr(args, 'files'):
            check_files = args.files.split('\n')
        file_list = []
        for filename in check_files:
            try:
                if not os.path.exists(filename):
                    file_list.append({'filename': filename, 'exists': False, 'size': 0, 'mtime': 0, 'isfile': False})
                    continue
                _stat = os.stat(filename)
                file_list.append({
                    'filename': filename,
                    'exists': True,
                    'size': _stat.st_size,
                    'mtime': int(_stat.st_mtime),
                    'isfile': os.path.isfile(filename)
                })
            except:
                file_list.append({'filename': filename, 'exists': False, 'size': 0, 'mtime': 0, 'isfile': False})
        return file_list
    
    def get_real_len(self, string):
        '''
            @name 获取含中文的字符串字精确长度
            @author hwliang<2021-11-3>
            @param string<str>
            @return int
        '''
        real_len = len(string)
        for s in string:
            if '\u2E80' <= s <= '\uFE4F':
                real_len += 1
        return real_len

    # 上传文件2
    def upload(self, args):
        from BTPanel import request
        if not 'f_name' in args:
            args.f_name = request.form.get('f_name')
            args.f_path = request.form.get('f_path')
            args.f_size = request.form.get('f_size')
            args.f_start = request.form.get('f_start')

        if sys.version_info[0] == 2:
            args.f_name = args.f_name.encode('utf-8')
            args.f_path = args.f_path.encode('utf-8')
        try:
            save_path = os.path.join(args.f_name + '.' + str(int(args.f_size)) + '.upload.tmp')
            max_filename_length = os.pathconf(args.f_path, "PC_NAME_MAX")
            # if self.get_real_len(save_path) > max_filename_length: return public.returnMsg(False, '文件名长度超过{}字节'.format(max_filename_length))
            if len(save_path.encode('utf-8')) > max_filename_length: return public.returnMsg(False,
                                                                                             '文件名长度超过{}字节'.format(
                                                                                                 max_filename_length + 1))
        except:
            pass
        if not self.f_name_check(args.f_name): return public.returnMsg(False, '文件名中包含特殊字符!')

        if args.f_path == '/':
            return public.returnMsg(False, '不能直接上传文件到系统根目录!')

        if args.f_name.find('./') != -1 or args.f_path.find('./') != -1:
            return public.returnMsg(False, '错误的参数')
        # 判断是否存在同名文件
        if pathlib.Path(args.f_path).is_file():
            return public.returnMsg(False, "存在与上传文件夹同名的文件请检查后重试")
        if not os.path.exists(args.f_path):
            try:
                os.makedirs(args.f_path, 493)
            except PermissionError:
                return public.returnMsg(False, "当前用户没有足够的权限去访问或者修改{}".format(args.f_path))
            except OSError as e:
                if 'Read-only' in str(e):
                    return public.returnMsg(False, "当前目录为只读权限")
                else:
                    return public.returnMsg(False, "上传失败:{}".format(str(e)))
            if not 'dir_mode' in args or not 'file_mode' in args:
                self.set_mode(args.f_path)

        save_path = os.path.join(
            args.f_path, args.f_name + '.' + str(int(args.f_size)) + '.upload.tmp')
        d_size = 0
        if os.path.exists(save_path):
            d_size = os.path.getsize(save_path)
        if d_size != int(args.f_start):
            return d_size
        try:
            f = open(save_path, 'ab')
            if 'b64_data' in args:
                import base64
                b64_data = base64.b64decode(args.b64_data)
                f.write(b64_data)
            else:
                upload_files = request.files.getlist("blob")
                for tmp_f in upload_files:
                    f.write(tmp_f.read())
            f.close()
        except Exception as ex:
            ex = str(ex)
            if ex.find('No space left on device') != -1:
                return public.returnMsg(False, '磁盘空间不足')
        if os.path.exists(save_path):
            f_size = os.path.getsize(save_path)
        else:
            f_size = 0
        if f_size is not None and f_size != int(args.f_size):
            if f_size > int(args.f_size):
                return public.returnMsg(False, "文件上传发生错误请删除临时文件【{}】后重试".format(save_path))
            return f_size
        new_name = os.path.join(args.f_path, args.f_name)
        if os.path.exists(new_name):
            if new_name.find('.user.ini') != -1:
                public.ExecShell("chattr -i " + new_name)
            # try:
            #     os.remove(new_name)
            # except:
            #     public.ExecShell("rm -f %s" % new_name)
        # 判断是否存在同名目录
        if pathlib.Path(new_name).is_dir():
            return public.returnMsg(False, "存在与上传文件同名的文件夹请检查后重试")
        try:
            os.renames(save_path, new_name)
        except PermissionError:
            os.remove(save_path)
            return public.returnMsg(False, '当前用户没有足够的权限去访问或者修改')
        except Exception as e:
            os.remove(save_path)
            return public.returnMsg(False, '上传失败:{}'.format(str(e)))

        if 'dir_mode' in args and 'file_mode' in args:
            mode_tmp1 = args.dir_mode.split(',')
            public.set_mode(args.f_path, mode_tmp1[0])
            public.set_own(args.f_path, mode_tmp1[1])
            mode_tmp2 = args.file_mode.split(',')
            public.set_mode(new_name, mode_tmp2[0])
            public.set_own(new_name, mode_tmp2[1])

        else:
            if os.path.exists(new_name):
                self.set_mode(new_name)
        if new_name.find('.user.ini') != -1:
            public.ExecShell("chattr +i " + new_name)

        public.WriteLog('TYPE_FILE', 'FILE_UPLOAD_SUCCESS',
                        (args.f_name, args.f_path))


        return public.returnMsg(True, '上传成功!')

    # 设置文件和目录权限
    def set_mode(self, path):
        if path[-1] == '/': path = path[:-1]
        s_path = os.path.dirname(path)
        p_stat = os.stat(s_path)
        os.chown(path, p_stat.st_uid, p_stat.st_gid)
        os.chmod(path, p_stat.st_mode)

    # 是否包含composer.json
    def is_composer_json(self, path):
        if os.path.exists(path + '/composer.json'):
            return '1'
        return '0'

    def __check_favorite(self, filepath, favorites_info):
        for favorite in favorites_info:
            if filepath == favorite['path']:
                return '1'
        return '0'

    def __get_topping_data(self):
        """
        @获取置顶配置
        """
        data = {}
        conf_file = '{}/data/toping.json'.format(public.get_panel_path())
        try:
            if os.path.exists(conf_file):
                data = json.loads(public.readFile(conf_file))
        except:
            pass
        return data

    def __check_topping(self, filepath, top_info):
        """
        @name 检测文件或者目录是否置顶
        @param filepath: 文件路径
        """
        if filepath in top_info:
            return '1'
        import html
        filepath = html.unescape(filepath)
        if filepath in top_info:
            return '1'
        return '0'

    def __check_share(self, filename):
        if self.download_token_list == None:
            self.download_token_list = {}
            my_table = 'download_token'
            download_list = public.M(my_table).field('id,filename').select()
            for k in download_list:
                self.download_token_list[k['filename']] = k['id']

        return str(self.download_token_list.get(filename, '0'))

    def __filename_flater(self, filename):
        ms = {";": ""}
        for m in ms.keys():
            filename = filename.replace(m, ms[m])
        return filename

    def files_list(self, path, search=None, my_sort='off', reverse=False):
        '''
            @name 遍历目录，并获取全量文件信息列表
            @param path<string> 目录路径
            @param search<string> 搜索关键词
            @param my_sort<string> 排序字段
            @param reverse<bool> 是否降序
            @return tuple (int,list)
        '''

        nlist = []
        count = 0

        # 文件不存在
        if not os.path.exists(path):
            return count, nlist

        sort_key = -1
        if my_sort == 'off':  # 不排序
            sort_key = -1
        elif my_sort == 'name':  # 按文件名排序
            sort_key = 0
        elif my_sort == 'size':  # 按文件大小排序
            sort_key = 1
        elif my_sort == 'mtime':  # 按修改时间排序
            sort_key = 2
        elif my_sort == 'accept':  # 按文件权限排序
            sort_key = 3
        elif my_sort == 'user':  # 按文件所有者排序
            sort_key = 4

        with os.scandir(path) as it:
            try:
                for entry in it:
                    # 是否搜索
                    if search:
                        if entry.name.lower().find(search) == -1:
                            continue

                    # 是否需要获取文件信息
                    sort_val = 0
                    if sort_key == 0 or sort_key == -1:
                        # 通过文件名或不排序时，不获取文件信息
                        sort_val = 0
                    else:
                        try:
                            fstat = entry.stat()
                            if sort_key == 1:
                                sort_val = fstat.st_size
                            elif sort_key == 2:
                                sort_val = fstat.st_mtime
                            elif sort_key == 3:
                                sort_val = fstat.st_mode
                            elif sort_key == 4:
                                sort_val = fstat.st_uid
                        except:
                            pass
                    try:  # 2026/02/26 处理软连接的目标文件或文件不存在，导致的 entry.is_dir() 报错
                        nlist.append((entry.name, sort_val, entry.is_dir()))
                        # 计数
                        count += 1
                    except:
                        pass
            except:
                pass

        if sort_key == 0:
            # 按文件名排序
            nlist = sorted(nlist, key=lambda x: [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', x[0])], reverse=reverse)
        elif sort_key > 0:
            # 按指定字段排序
            nlist = sorted(nlist, key=lambda x: x[1], reverse=reverse)
        else:
            # 否则文件数量小于10000时，按文件名排序
            if count < 10000:
                nlist = sorted(nlist, key=lambda x: [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', x[0])], reverse=False)
            else:
                nlist = sorted(nlist, key=lambda x: x[0], reverse=False)
        nlist = sorted(nlist, key=lambda x: x[2], reverse=True)

        return count, nlist


    # 取文件/目录列表
    def GetDir(self, get):
        if not hasattr(get, 'path'):
            # return public.returnMsg(False,'错误的参数!')
            get.path = public.get_site_path()  # '/www/wwwroot'
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if get.path == '':
            get.path = '/www'

        # 转换包含~的路径
        if get.path.find('~') != -1:
            get.path = os.path.expanduser(get.path)
        get.path = self.xssdecode(get.path)
        if not os.path.exists(get.path):
            get.path = public.get_site_path()
            # return public.ReturnMsg(False, '指定目录不存在!')
        if os.path.basename(get.path) == '.Recycle_bin':
            return public.returnMsg(False, '此为回收站目录，请在右上角按【回收站】按钮打开')
        if not os.path.isdir(get.path):
            get.path = os.path.dirname(get.path)

        if not os.path.isdir(get.path):
            return public.returnMsg(False, '这不是一个目录!')

        dirnames = []
        filenames = []

        search = None
        if hasattr(get, 'search'):
            search = get.search.strip().lower()
            public.set_search_history('files', 'get_list', search)
        if hasattr(get, 'all'):
            return self.SearchFiles(get)

        # 包含分页类
        import page
        # 实例化分页类
        page = page.Page()
        info = {}

        if not hasattr(get, 'reverse'): get.reverse = 'False'
        if not hasattr(get, 'sort'): get.sort = 'off'
        reverse = bool(get.reverse)
        if get.reverse == 'False':
            reverse = False

        info['count'], _nlist = self.files_list(get.path, search, my_sort=get.sort, reverse=reverse)

        # info['count'] = self.GetFilesCount(get.path, search)
        info['row'] = 500
        if 'disk' in get:
            if get.disk == 'true': info['row'] = 2000
        if 'share' in get and get.share:
            info['row'] = 5000
        info['p'] = 1
        if hasattr(get, 'p'):
            try:
                info['p'] = int(get['p'])
            except:
                info['p'] = 1

        info['uri'] = {}
        info['return_js'] = ''
        if hasattr(get, 'tojs'):
            info['return_js'] = get.tojs
        if hasattr(get, 'showRow'):
            try:
               info['row'] = int(get.showRow)
            except:
               info['row'] = 500 
        # 获取分页数据
        data = {}
        data['PAGE'] = page.GetPage(info, '1,2,3,4,5,6,7,8')

        i = 0
        n = 0

        top_data = self.__get_topping_data()
        data['STORE'] = self.get_files_store(None)
        data['FILE_RECYCLE'] = os.path.exists('data/recycle_bin.pl')

        # if info['count'] >= 200 and not os.path.exists('data/max_files_sort.pl'):
        #     get.reverse = 'False'
        #     reverse = False
        #     get.sort = ''

        #     _nlist = self.__default_list_dir(get.path,page.SHIFT,page.ROW)
        #     data['SORT'] = 0
        # else:
        # _nlist = self.__list_dir(get.path, get.sort, reverse)

        for file_info in _nlist:

            if search:
                if file_info[0].lower().find(search) == -1:
                    continue
            i += 1
            if n >= page.ROW:
                break
            if i < page.SHIFT:
                continue

            try:
                fname = file_info[0].encode('unicode_escape').decode("unicode_escape")
                filename = os.path.join(get.path, fname)
                if not os.path.exists(filename) and not os.path.islink(filename): continue
                file_info = self.__format_stat_old(filename, get.path)
                if not file_info: continue
                favorite = self.__check_favorite(filename, data['STORE'])
                r_file = self.__filename_flater(file_info['name']) + ';' + str(file_info['size']) + ';' + str(
                    file_info['mtime']) + ';' + str(
                    file_info['accept']) + ';' + file_info['user'] + ';' + file_info['link'] + ';' \
                         + self.get_download_id(filename) + ';' + self.is_composer_json(filename) + ';' \
                         + favorite + ';' + self.__check_share(filename)
                if os.path.isdir(filename):
                    dirnames.append(r_file)
                else:
                    filenames.append(r_file)
                n += 1
            except:
                continue

        data['DIR'] = dirnames
        data['FILES'] = filenames
        data['PATH'] = str(get.path)

        # 2022-07-29,增加置顶排序
        tmp_dirs = []
        for i in range(len(data['DIR'])):
            filepath = os.path.join(data['PATH'], data['DIR'][i].split(';')[0])
            toping = self.__check_topping(filepath, top_data)
            info = data['DIR'][i] + ';' + self.get_file_ps(filepath) + ';' + toping
            if toping == '1':
                tmp_dirs.insert(0, info)
            else:
                tmp_dirs.append(info)

        tmp_files = []
        for i in range(len(data['FILES'])):
            filepath = os.path.join(data['PATH'], data['FILES'][i].split(';')[0])
            toping = self.__check_topping(filepath, top_data)
            info = data['FILES'][i] + ';' + self.get_file_ps(filepath) + ';' + toping
            if toping == '1':
                tmp_files.insert(0, info)
            else:
                tmp_files.append(info)

        data['DIR'] = tmp_dirs
        data['FILES'] = tmp_files

        if hasattr(get, 'disk'):
            import system
            data['DISK'] = system.system().GetDiskInfo()

        data['dir_history'] = public.get_dir_history('files', 'GetDirList')
        data['search_history'] = public.get_search_history('files', 'get_list')
        public.set_dir_history('files', 'GetDirList', data['PATH'])

        # 2023-3-6,增加融入企业级防篡改
        data = self._check_tamper(data)
        data = self._get_bt_sync_status_old(data)

        return data

    # 取文件/目录列表
    def GetDirNew(self, get):
        if not hasattr(get, 'path'):
            get.path = public.get_site_path()  # '/www/wwwroot'
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if get.path == '':
            get.path = '/www'
        # 转换包含~的路径
        if get.path.find('~') != -1:
            get.path = os.path.expanduser(get.path)
        get.path = self.xssdecode(get.path)
        if not os.path.exists(get.path):
            get.path = public.get_site_path()
            # return public.ReturnMsg(False, '指定目录不存在!')
        if os.path.basename(get.path) == '.Recycle_bin':
            return public.returnMsg(False, '此为回收站目录，请在右上角按【回收站】按钮打开')
        if not os.path.isdir(get.path):
            get.path = os.path.dirname(get.path)
        if not os.path.isdir(get.path):
            return public.returnMsg(False, '这不是一个目录!')
        dirnames = []
        filenames = []
        search = None
        if hasattr(get, 'search'):
            search = get.search.strip().lower()
            public.set_search_history('files', 'get_list', search)
        if hasattr(get, 'all'):
            return self.SearchFilesNew(get)
        # 获取分页数据
        data = {}
        top_data = self.__get_topping_data()
        data['store'] = self.get_files_store(None)
        data['file_recycle'] = os.path.exists('data/recycle_bin.pl')
        if not hasattr(get, 'reverse'): get.reverse = 'False'
        if not hasattr(get, 'sort'): get.sort = 'name'
        reverse = bool(get.reverse)
        if get.reverse == 'False':
            reverse = False
        # list_data = self.__list_dir(get.path, get.sort, reverse, search)
        n_count, list_data = self.files_list(get.path, search, my_sort=get.sort, reverse=reverse)
        # 包含分页类
        import page
        # 实例化分页类
        page = page.Page()
        info = {
            'count': n_count,
            'uri': {},
            'row': int(get.showRow) if hasattr(get, 'showRow') else 2000 if 'disk' in get and get.disk == 'true' else 5000 if 'share' in get and get.share else 500,
            'p': int(get.get('p', 1)),
            'return_js': get.tojs if hasattr(get, 'tojs') else '',
        }
        # if 'disk' in get:
        #     if get.disk == 'true': info['row'] = 2000
        # if 'share' in get and get.share:
        #     info['row'] = 5000
        # info['p'] = int(get.get('p', 1))
        # info['uri'] = {}
        # info['return_js'] = ''
        # if hasattr(get, 'tojs'):
        #     info['return_js'] = get.tojs
        # if hasattr(get, 'showRow'):
        #     info['row'] = int(get.showRow)
        data['page'] = page.GetPage(info, '1,2,3,4,5,6,7,8')
        import html
        pss = self.get_file_ps_list()
        self.get_download_list()
        top_dir = []
        top_file = []
        file_nm = []
        dir_nm = []

        for file_info in list_data[page.SHIFT:page.SHIFT + page.ROW]:
            filename = os.path.join(get.path, file_info[0])

            if not os.path.exists(filename) and not os.path.islink(filename): continue
            content = os.stat(filename) if not os.path.islink(filename) or os.path.exists(filename) else public.to_dict_obj({'st_size': 0, 'st_mtime': 0, 'st_mode': 0, 'st_uid': 0})

            try:
                # if get.path != "/":
                user_name = pwd.getpwuid(content.st_uid).pw_name
                # else:
                #     user_name = 'root'
            except KeyError:
                user_name = '-'

            if str(filename).endswith(".bt_split_json"):
                pss.update({filename: "PS：拆分恢复配置文件"})
            if str(filename).endswith(".bt_split"):
                pss.update({filename: "PS：拆分单元文件"})
            # 备注
            try:
                rmk = public.readFile('data/files_ps/' + public.Md5(filename)) if os.path.exists('data/files_ps/' + public.Md5(filename)) else pss.get(filename, '')
            except:
                rmk = ''

            try:
                r_file = {
                    'nm': html.unescape(file_info[0]),  # 文件名
                    'sz': content.st_size,  # 文件大小
                    'mt': int(content.st_mtime),  # 修改时间
                    'acc': str(oct(content.st_mode)[-3:]),  # 权限
                    'user': user_name,  # 用户
                    'lnk': '->' + os.readlink(filename) if os.path.islink(filename) else '',  # 链接
                    'durl': str(self.download_token_list.get(filename, '')),  # 下载链接
                    'cmp': 1 if os.path.exists(filename + '/composer.json') else 0,  # 是否包含composer.json
                    'fav': self.__check_favorite(filename, data['store']),  # 是否为收藏
                    'rmk': rmk,  # 备注
                    'top': 1 if html.unescape(filename) in top_data else 0,  # 文件或者目录是否置顶
                    'sn': file_info[0]
                }
                if os.path.isdir(filename):
                    if int(r_file['top']):
                        top_dir.append(r_file)
                    else:
                        dirnames.append(r_file)
                    dir_nm.append(r_file['nm'])
                else:
                    if int(r_file['top']):
                        top_file.append(r_file)
                    else:
                        filenames.append(r_file)
                    file_nm.append(r_file['nm'])
            except:
                pass

        data['path'] = str(get.path)
        data['dir'] = top_dir + dirnames
        data['files'] = top_file + filenames
        if hasattr(get, 'disk'):
            import system
            data['disk'] = system.system().GetDiskInfo()
        data['dir_history'] = public.get_dir_history('files', 'GetDirList')
        data['search_history'] = public.get_search_history('files', 'get_list')
        public.set_dir_history('files', 'GetDirList', data['path'])
        # 2023-3-6,增加融入企业级防篡改
        data['tamper_data'] = self._new_check_tamper(data)
        data['is_max'] = False
        data = self._get_bt_sync_status(data)
        return data

    def get_file_ps(self, filename):
        '''
            @name 获取文件或目录备注
            @author hwliang<2020-10-22>
            @param filename<string> 文件或目录全路径
            @return string
        '''
        try:
            ps_path = public.get_panel_path() + '/data/files_ps'
            f_key1 = '/'.join((ps_path, public.md5(filename)))
            if os.path.exists(f_key1):
                return public.readFile(f_key1)

            f_key2 = '/'.join((ps_path, public.md5(os.path.basename(filename))))
            if os.path.exists(f_key2):
                return public.readFile(f_key2)
        except:
            pass

        pss = {
            '/www/server/data': '此为MySQL数据库默认数据目录，请勿删除!',
            '/www/server/mysql': 'MySQL程序目录',
            '/www/server/redis': 'Redis程序目录',
            '/www/server/mongodb': 'MongoDB程序目录',
            '/www/server/nvm': 'PM2/NVM/NPM程序目录',
            '/www/server/pass': '网站BasicAuth认证密码存储目录',
            '/www/server/speed': '网站加速数据目录',
            '/www/server/docker': 'Docker插件程序与数据目录',
            '/www/server/total': '网站监控报表数据目录',
            '/www/server/btwaf': 'WAF防火墙数据目录',
            '/www/server/pure-ftpd': 'ftp程序目录',
            '/www/server/phpmyadmin': 'phpMyAdmin程序目录',
            '/www/server/rar': 'rar扩展库目录，删除后将失去对RAR压缩文件的支持',
            '/www/server/stop': '网站停用页面目录,请勿删除!',
            '/www/server/nginx': 'Nginx程序目录',
            '/www/server/apache': 'Apache程序目录',
            '/www/server/cron': '计划任务脚本与日志目录',
            '/www/server/php': 'PHP目录，所有PHP版本的解释器都在此目录下',
            '/www/server/tomcat': 'Tomcat程序目录',
            '/www/php_session': 'PHP-SESSION隔离目录',
            '/proc': '系统进程目录',
            '/dev': '系统设备目录',
            '/sys': '系统调用目录',
            '/tmp': '系统临时文件目录',
            '/var/log': '系统日志目录',
            '/var/run': '系统运行日志目录',
            '/var/spool': '系统队列目录',
            '/var/lock': '系统锁定目录',
            '/var/mail': '系统邮件目录',
            '/mnt': '系统挂载目录',
            '/media': '系统多媒体目录',
            '/dev/shm': '系统共享内存目录',
            '/lib': '系统动态库目录',
            '/lib64': '系统动态库目录',
            '/lib32': '系统动态库目录',
            '/usr/lib': '系统动态库目录',
            '/usr/lib64': '系统动态库目录',
            '/usr/local/lib': '系统动态库目录',
            '/usr/local/lib64': '系统动态库目录',
            '/usr/local/libexec': '系统动态库目录',
            '/usr/local/sbin': '系统脚本目录',
            '/usr/local/bin': '系统脚本目录'

        }
        if str(filename).endswith(".bt_split_json"):
            return "PS：拆分恢复配置文件"
        if str(filename).endswith(".bt_split"):
            return "PS：拆分单元文件"
        if filename in pss:  return "PS：" + pss[filename]
        try:
            if not self.recycle_list: self.recycle_list = public.get_recycle_bin_list()
        except:
            pass
        if filename + '/' in self.recycle_list: return 'PS：回收站目录'
        if filename in self.recycle_list: return 'PS：回收站目录'
        return ''

    def get_file_ps_list(self):
        pss = {
            '/www/server/data': '此为MySQL数据库默认数据目录，请勿删除!',
            '/www/server/mysql': 'MySQL程序目录',
            '/www/server/redis': 'Redis程序目录',
            '/www/server/mongodb': 'MongoDB程序目录',
            '/www/server/nvm': 'PM2/NVM/NPM程序目录',
            '/www/server/pass': '网站BasicAuth认证密码存储目录',
            '/www/server/speed': '网站加速数据目录',
            '/www/server/docker': 'Docker插件程序与数据目录',
            '/www/server/total': '网站监控报表数据目录',
            '/www/server/btwaf': 'WAF防火墙数据目录',
            '/www/server/pure-ftpd': 'ftp程序目录',
            '/www/server/phpmyadmin': 'phpMyAdmin程序目录',
            '/www/server/rar': 'rar扩展库目录，删除后将失去对RAR压缩文件的支持',
            '/www/server/stop': '网站停用页面目录,请勿删除!',
            '/www/server/nginx': 'Nginx程序目录',
            '/www/server/apache': 'Apache程序目录',
            '/www/server/cron': '计划任务脚本与日志目录',
            '/www/server/php': 'PHP目录，所有PHP版本的解释器都在此目录下',
            '/www/server/tomcat': 'Tomcat程序目录',
            '/www/php_session': 'PHP-SESSION隔离目录',
            '/proc': '系统进程目录',
            '/dev': '系统设备目录',
            '/sys': '系统调用目录',
            '/tmp': '系统临时文件目录',
            '/var/log': '系统日志目录',
            '/var/run': '系统运行日志目录',
            '/var/spool': '系统队列目录',
            '/var/lock': '系统锁定目录',
            '/var/mail': '系统邮件目录',
            '/mnt': '系统挂载目录',
            '/media': '系统多媒体目录',
            '/dev/shm': '系统共享内存目录',
            '/lib': '系统动态库目录',
            '/lib64': '系统动态库目录',
            '/lib32': '系统动态库目录',
            '/usr/lib': '系统动态库目录',
            '/usr/lib64': '系统动态库目录',
            '/usr/local/lib': '系统动态库目录',
            '/usr/local/lib64': '系统动态库目录',
            '/usr/local/libexec': '系统动态库目录',
            '/usr/local/sbin': '系统脚本目录',
            '/usr/local/bin': '系统脚本目录',
            '/www/reserve_space.pl': '面板磁盘预留空间文件,可以删除'
        }
        recycle_list = public.get_recycle_bin_list()
        recycle_list = {i: "PS：回收站目录" for i in recycle_list}
        pss.update(recycle_list)
        return pss

    def set_file_ps(self, args):
        '''
            @name 设置文件或目录备注
            @author hwliang<2020-10-22>
            @param filename<string> 文件或目录全路径
            @param ps_type<int> 备注类型 0.完整路径 1.文件名称
            @param ps_body<string> 备注内容
            @return dict
        '''
        filename = args.filename.strip()
        ps_type = int(args.ps_type)
        ps_body = public.xssencode2(args.ps_body)
        ps_path = public.get_panel_path() + '/data/files_ps'
        if not os.path.exists(ps_path):
            os.makedirs(ps_path, 384)
        if ps_type == 1:
            f_name = os.path.basename(filename)
        else:
            f_name = filename
        ps_key = public.md5(f_name)

        f_key = '/'.join((ps_path, ps_key))
        if ps_body:
            public.writeFile(f_key, ps_body)
            public.WriteLog('文件管理', '设置文件名[{}],备注为: {}'.format(f_name, ps_body))
        else:
            if os.path.exists(f_key):
                os.remove(f_key)
                public.WriteLog('文件管理', '清除文件备注[{}]'.format(f_name))
        return public.returnMsg(True, '设置成功')

    def check_file_sort(self, sort):
        """
        @校验排序字段
        """
        slist = ['name', 'size', 'mtime', 'accept', 'user']
        if sort in slist: return sort
        return 'name'

    def __default_list_dir(self, path, shift, row):
        """
        @name 获取默认文件列表
        @param path<string> 路径
        @param shift<int> 开始偏移量
        @param row<int> 结束偏移量
        """
        tmp_files = []
        file_total = 0
        for f_name in os.listdir(path):
            file_total += 1
            if file_total > row:
                break
            if file_total <= shift:
                continue
            tmp_files.append((f_name, 0))
        return tmp_files

    def __list_dir(self, path, my_sort='name', reverse=False, search=None):
        '''
            @name 获取文件列表，并排序
            @author hwliang<2020-08-01>
            @param path<string> 路径
            @param my_sort<string> 排序字段
            @param reverse<bool> 是否降序
            @param list
        '''
        if not os.path.exists(path):
            return []
        py_v = sys.version_info[0]
        tmp_files = []

        for f_name in os.listdir(path):
            try:
                if py_v == 2:
                    f_name = f_name.encode('utf-8')

                f_name = f_name.encode('unicode_escape').decode("unicode_escape")
                # 使用.join拼接效率更高
                filename = "/".join((path, f_name))
                if search:
                    if filename.lower().find(search) == -1:
                        continue

                sort_key = 1
                sort_val = 0
                # 此处直接做异常处理比先判断文件是否存在更高效
                if my_sort == 'name':
                    sort_key = 0
                elif my_sort == 'size':
                    sort_val = os.stat(filename).st_size
                elif my_sort == 'mtime':
                    sort_val = os.stat(filename).st_mtime
                elif my_sort == 'accept':
                    sort_val = os.stat(filename).st_mode
                elif my_sort == 'user':
                    sort_val = os.stat(filename).st_uid
            except Exception as err:
                continue
            # 使用list[tuple]排序效率更高
            # if f_name and sort_val:
            tmp_files.append((f_name, sort_val))
        try:
            # 2023-5-29 修改成为自然语言排序
            from natsort import natsorted, ns

            # tmp_files1 = tmp_files[:5000]
            if my_sort == 'name':
                tmp_files = natsorted(tmp_files, alg=ns.PATH, reverse=reverse)
                # tmp_files2 = natsorted(tmp_files1, alg=ns.PATH, reverse=reverse)
            else:
                tmp_files = sorted(tmp_files, key=lambda x: x[1], reverse=reverse)
                # tmp_files2 = sorted(tmp_files1, key=lambda x: x[1], reverse=reverse)

            # tmp_files = tmp_files2 + tmp_files[5000:]
        except Exception as e:
            pass
        return tmp_files

    def __format_stat_old(self, filename, path):
        try:
            stat = self.__get_stat_old(filename, path)
            if not stat:
                return None
            tmp_stat = stat.split(';')
            file_info = {
                'name': self.xssencode(tmp_stat[0].replace('/', '')), 'size': int(tmp_stat[1]), 'mtime': int(
                    tmp_stat[2]), 'accept': tmp_stat[3], 'user': tmp_stat[4], 'link': tmp_stat[5]
            }
            return file_info
        except:
            return None

    def __get_stat_old(self, filename, path=None):
        if os.path.islink(filename) and not os.path.exists(filename):
            accept = "0"
            mtime = "0"
            user = "0"
            size = "0"
        else:
            stat = os.stat(filename)
            accept = str(oct(stat.st_mode)[-3:])
            mtime = str(int(stat.st_mtime))
            user = ''
            try:
                user = pwd.getpwuid(stat.st_uid).pw_name
            except:
                user = str(stat.st_uid)
            size = str(stat.st_size)
        link = ''
        down_url = self.get_download_id(filename)
        if os.path.islink(filename):
            link = ' -> ' + os.readlink(filename)
        tmp_path = (path + '/').replace('//', '/')
        if path and tmp_path != '/':
            filename = filename.replace(tmp_path, '', 1)
        favorite = self.__check_favorite(filename, self.get_files_store(None))
        return filename + ';' + size + ';' + mtime + ';' + accept + ';' + user + ';' + link + ';' + down_url + ';' + \
            self.is_composer_json(filename) + ';' + favorite + ';' + self.__check_share(filename)

    def __format_stat(self, filename, path):
        try:
            stat = self.__get_stat(filename, path)
            if not stat:
                return None
            tmp_stat = stat.split(';')
            file_info = {
                'name': self.xssencode(tmp_stat[0].replace('/', '')), 'size': int(tmp_stat[1]), 'mtime': int(
                    tmp_stat[2]), 'accept': tmp_stat[3], 'user': tmp_stat[4], 'link': tmp_stat[5]
            }
            return file_info
        except:
            return None

    def SearchFiles(self, get):
        if not hasattr(get, 'path'):
            get.path = public.get_site_path()
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if not os.path.exists(get.path):
            get.path = '/www'
        search = get.search.strip().lower()
        my_dirs = []
        my_files = []
        count = 0
        max = 3000
        for d_list in os.walk(get.path):
            if count >= max:
                break
            for d in d_list[1]:
                if count >= max:
                    break
                d = self.xssencode(d)
                if d.lower().find(search) != -1:
                    filename = '{}/{}'.format(d_list[0] if d_list[0] != '/' else '', d)
                    if not os.path.exists(filename):
                        continue
                    my_dirs.append(self.__get_stat_old(filename, get.path))
                    count += 1

            for f in d_list[2]:
                if count >= max:
                    break
                f = self.xssencode(f)
                if f.lower().find(search) != -1:
                    filename = '{}/{}'.format(d_list[0] if d_list[0] != '/' else '', f)
                    if not os.path.exists(filename):
                        continue
                    my_files.append(self.__get_stat_old(filename, get.path))
                    count += 1
        data = {}
        # 先对目录和文件进行排序
        sorted_dirs = sorted(my_dirs)
        sorted_files = sorted(my_files)

        # 计算起始和结束位置
        start = (int(get.p) - 1) * int(get.showRow)
        end = start + int(get.showRow)

        # 如果目录数大于等于结束位置，则按范围提取目录和文件
        if len(sorted_dirs) >= end:
            data['DIR'] = sorted_dirs[start:end]
            data['FILES'] = []
        # 如果起始位置小于目录数但结束位置大于目录数，则提取部分目录和剩余文件
        elif start < len(sorted_dirs) < end:
            data['DIR'] = sorted_dirs[start:len(sorted_dirs)]
            data['FILES'] = sorted_files[len(sorted_dirs):end]
        # 否则目录和文件都为空
        else:
            data['DIR'] = []
            data['FILES'] = sorted_files[start:end]
        # data['DIR'] = sorted(my_dirs)
        # data['FILES'] = sorted(my_files)
        data['PATH'] = str(get.path)
        # 包含分页类
        import page
        # 实例化分页类
        page = page.Page()
        info = {}

        info['count'] = len(my_dirs) + len(my_files)
        info['row'] = 500
        if 'disk' in get:
            if get.disk == 'true': info['row'] = 2000
        if 'share' in get and get.share:
            info['row'] = 5000
        info['p'] = 1
        if hasattr(get, 'p'):
            try:
                info['p'] = int(get['p'])
            except:
                info['p'] = 1

        info['uri'] = {}
        info['return_js'] = ''
        if hasattr(get, 'tojs'):
            info['return_js'] = get.tojs
        if hasattr(get, 'showRow'):
            info['row'] = int(get.showRow)

        # 获取分页数据
        data['PAGE'] = page.GetPage(info, '1,2,3,4,5,6,7,8')
        data['STORE'] = self.get_files_store(None)
        return data

    def SearchFilesNew(self, get):
        if not hasattr(get, 'path'):
            get.path = public.get_site_path()
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if not os.path.exists(get.path):
            get.path = '/www'
        search = ""
        if hasattr(get, 'search'):
            search = get.search.strip().lower()
        my_dirs = []
        my_files = []
        count = 0
        max = 3000
        is_max = False
        for d_list in os.walk(get.path):
            if count >= max:
                is_max = True
                break
            for d in d_list[1]:
                if count >= max:
                    break
                sn = d
                d = self.xssencode(d)
                if d.lower().find(search) != -1:
                    filename = '{}/{}'.format(d_list[0] if d_list[0] != '/' else '', d)
                    if not os.path.exists(filename):
                        continue
                    my_dirs.append(self.__get_stat(filename, get.path, sn=sn))
                    count += 1

            for f in d_list[2]:
                if count >= max:
                    break
                sn = f
                f = self.xssencode(f)
                if f.lower().find(search) != -1:
                    filename = '{}/{}'.format(d_list[0] if d_list[0] != '/' else '', f)
                    if not os.path.exists(filename):
                        continue
                    my_files.append(self.__get_stat(filename, get.path, sn=sn))
                    count += 1
        data = {}
        # data['DIR'] = sorted(my_dirs)
        # data['FILES'] = sorted(my_files)
        sort = 'nm'
        reverse = False
        if 'sort' in get and get.sort:
            sort = 'nm' if get.sort == 'name' else 'sz' if get.sort == 'size' else 'mt' if get.sort == 'mtime' else 'nm'
            if 'reverse' in get and get.reverse in ('True', 'true', '1', 1):
                reverse = True
        # 先对目录和文件进行排序
        sorted_dirs = sorted(my_dirs, key=lambda file: file[sort], reverse=reverse)
        sorted_files = sorted(my_files, key=lambda file: file[sort], reverse=reverse)

        # 计算起始和结束位置
        start = (int(get.p) - 1) * int(get.showRow)
        end = start + int(get.showRow)

        # 如果目录数大于等于结束位置，则按范围提取目录和文件
        if len(sorted_dirs) >= end:
            data['dir'] = sorted_dirs[start:end]
            data['files'] = []
        # 如果起始位置小于目录数但结束位置大于目录数，则提取部分目录和剩余文件
        elif start < len(sorted_dirs) < end:
            data['dir'] = sorted_dirs[start:len(sorted_dirs)]
            data['files'] = sorted_files[:end - len(sorted_dirs)]
        # 否则目录和文件都为空
        else:
            data['dir'] = []
            data['files'] = sorted_files[start:end]

        # data['dir'] = sorted(my_dirs, key=lambda file: file['nm'], reverse=False)
        # data['files'] = sorted(my_files, key=lambda file: file['nm'], reverse=False)
        data['path'] = str(get.path)
        data['page'] = public.get_page(
            len(my_dirs) + len(my_files), 1, max, 'GetFiles')['page']
        data['store'] = self.get_files_store(None)
        
        data['dir_history'] = public.get_dir_history('files', 'GetDirList')
        data['search_history'] = public.get_search_history('files', 'get_list')
        data['tamper_data'] = self._new_check_tamper(data)
        data['file_recycle'] = os.path.exists('data/recycle_bin.pl')
        data['is_max'] = is_max
        data = self._get_bt_sync_status(data)
        return data

    def __get_stat(self, filename, path=None, sn=None):
        if os.path.islink(filename) and not os.path.exists(filename):
            accept = "0"
            mtime = "0"
            user = "0"
            size = "0"
        else:
            stat = os.stat(filename)
            accept = str(oct(stat.st_mode)[-3:])
            mtime = str(int(stat.st_mtime))
            user = ''
            try:
                user = pwd.getpwuid(stat.st_uid).pw_name
            except:
                user = str(stat.st_uid)
            size = str(stat.st_size)
        link = ''
        down_url = self.get_download_id(filename)
        if os.path.islink(filename):
            link = ' -> ' + os.readlink(filename)
        tmp_path = (path + '/').replace('//', '/')
        if path and tmp_path != '/':
            filename = filename.replace(tmp_path, '', 1)
        favorite = self.__check_favorite(filename, self.get_files_store(None))

        file_info = {
            'nm': filename,  # 文件名
            'sz': int(size),  # 文件大小
            'mt': int(mtime),  # 修改时间
            'acc': accept,  # 权限
            'user': user,  # 用户
            'lnk': link,  # 链接
            'durl': down_url,  # 下载链接
            'cmp': self.is_composer_json(filename),  # composer.json
            'fav': favorite,  # 收藏
            'share': self.__check_share(filename),  # 共享
            'sn': sn or ''
        }

        return file_info

    # 获取指定目录下的所有视频或音频文件
    def get_videos(self, args):
        path = args.path.strip()
        v_data = []
        if not os.path.exists(path): return v_data
        import mimetypes
        for fname in os.listdir(path):
            try:
                filename = os.path.join(path, fname)
                if not os.path.exists(filename): continue
                if not os.path.isfile(filename): continue
                v_tmp = {}
                v_tmp['name'] = fname
                v_tmp['type'] = mimetypes.guess_type(filename)[0]
                v_tmp['size'] = os.path.getsize(filename)
                if not v_tmp['type'].split('/')[0] in ['video']:
                    continue
                v_data.append(v_tmp)
            except:
                continue
        return sorted(v_data, key=lambda x: x['name'])

    # 计算文件数量
    def GetFilesCount(self, path, search):
        if os.path.isfile(path):
            return 1
        if not os.path.exists(path):
            return 0
        i = 0
        try:
            for name in os.listdir(path):
                if search:
                    if name.lower().find(search) == -1:
                        continue
                i += 1
        except:
            return 0
        return i

    # 创建文件
    def CreateFile(self, get):
        # 校验磁盘大小
        df_data = public.ExecShell("df -T | grep '/'")[0]
        for data in str(df_data).split("\n"):
            data_list = data.split()
            if not data_list: continue
            use_size = data_list[4]
            size = data_list[5]
            disk_path = data_list[6]
            if int(use_size) < 1024 and str(size).rstrip("%") == "100" and disk_path in ["/", "/www"]:
                return public.returnMsg(False, f"文件创建失败！磁盘已满！请先清理空间!")

        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8').strip()
        try:
            fname = os.path.basename(get.path).strip()
            fpath = os.path.dirname(get.path).strip()
            get.path = os.path.join(fpath, fname)
            if get.path[-1] == '.':
                return public.returnMsg(False, '文件结尾不建议使用 "."，因为可能存在安全隐患')
            if not self.CheckFileName(get.path):
                return public.returnMsg(False, '文件名中不能包含特殊字符!')
            if os.path.exists(get.path):
                return public.returnMsg(False, 'FILE_EXISTS')
            path = os.path.dirname(get.path)
            if not os.path.exists(path):
                os.makedirs(path)
            open(get.path, 'w+').close()
            self.SetFileAccept(get.path)
            public.WriteLog('TYPE_FILE', 'FILE_CREATE_SUCCESS', (get.path,))
            return public.returnMsg(True, 'FILE_CREATE_SUCCESS')
        except PermissionError:
            return public.returnMsg(False, "当前目录不能创建文件，请检查目录是否被锁或开启了防篡改")
        except OSError as e:
            if 'Read-only' in str(e):
                return public.returnMsg(False, "当前目录为只读权限")
            else:
                return public.returnMsg(False, "创建文件失败:{}".format(str(e)))
        except:
            return public.returnMsg(False, 'FILE_CREATE_ERR')

    # 创建软链
    def CreateLink(self, get):
        '''
            @name 创建软链接
            @author hwliang<2021-03-23>
            @param get<dict_obj{
                sfile<string> 源文件
                dfile<string> 软链文件名
            }>
            @return dict
        '''

        if not 'sfile' in get: return public.returnMsg(False, '参数错误')
        if not os.path.exists(get.sfile): return public.returnMsg(False, '指定文件不存在，无法创建软链!')
        if os.path.exists(get.dfile): return public.returnMsg(False, '指定软链文件名已存在，请使用其它文件名，或先删除!')
        l_name = os.path.basename(get.dfile)
        if re.match(r"^[\w\-\.]+$", l_name) == None: return public.returnMsg(False, '软链文件名不合法!')
        if get.dfile[0] != '/': return public.returnMsg(False, '指定软链文件名必需包含完整路径(全路径)')
        public.ExecShell("ln -sf {} {}".format(get.sfile, get.dfile))
        if not os.path.exists(get.dfile): return public.returnMsg(False, '软链文件创建失败!')
        public.WriteLog('文件管理', '创建软链: {} -> {}'.format(get.dfile, get.sfile))
        return public.returnMsg(True, '软链文件创建成功!')

    # 创建目录
    def CreateDir(self, get):
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8').strip()
        try:
            if get.path[-1] == '.':
                return public.returnMsg(False, '目录结尾不建议使用 "."，因为可能存在安全隐患')
            if not self.CheckFileName(get.path):
                return public.returnMsg(False, '目录名中不能包含特殊字符!')
            if os.path.exists(get.path):
                return public.returnMsg(False, 'DIR_EXISTS')
            os.makedirs(get.path)
            self.SetFileAccept(get.path)
            public.WriteLog('TYPE_FILE', 'DIR_CREATE_SUCCESS', (get.path,))
            return public.returnMsg(True, 'DIR_CREATE_SUCCESS')
        except:
            return public.returnMsg(False, 'DIR_CREATE_ERR')

    # 删除目录
    def DeleteDir(self, get):
        from BTPanel import session
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if os.path.basename(get.path) in ['Recycle_bin', '.Recycle_bin']:
            return public.returnMsg(False, '不能直接操作回收站目录，请在右上角按【回收站】按钮打开')
        if not os.path.exists(get.path) and not os.path.islink(get.path):
            return public.returnMsg(False, 'DIR_NOT_EXISTS')

        # 检查是否敏感目录
        if not self.CheckDir(get.path):
            return public.returnMsg(False, 'FILE_DANGER')

        # 检查关键目录
        msg = self.CheckDelete(get.path)
        if msg is not None:
            return public.returnMsg(False, msg)

        try:
            # 检查是否存在.user.ini
            # if os.path.exists(get.path+'/.user.ini'):
            #    public.ExecShell("chattr -i '"+get.path+"/.user.ini'")
            public.ExecShell("chattr -R -i " + get.path)
            if hasattr(get, 'empty'):
                if not self.delete_empty(get.path):
                    return public.returnMsg(False, 'DIR_ERR_NOT_EMPTY')

            if os.path.exists('data/recycle_bin.pl') and session.get('debug') != 1:
                if self.Mv_Recycle_bin(get):
                    self.site_path_safe(get)
                    self.remove_file_ps(get)
                    public.add_security_logs("删除目录", " 删除目录" + get.path)
                    return public.returnMsg(True, 'DIR_MOVE_RECYCLE_BIN')
            if os.path.islink(get.path):
                os.remove(get.path)
            else:
                import shutil
                shutil.rmtree(get.path)
            self.site_path_safe(get)
            public.add_security_logs("删除目录", " 删除目录" + get.path)
            public.WriteLog('TYPE_FILE', 'DIR_DEL_SUCCESS', (get.path,))
            self.remove_file_ps(get)
            return public.returnMsg(True, 'DIR_DEL_SUCCESS')
        except:
            return public.returnMsg(False, 'DIR_DEL_ERR')

    # 删除 空目录
    def delete_empty(self, path):
        if sys.version_info[0] == 2:
            path = path.encode('utf-8')
        if len(os.listdir(path)) > 0:
            return False
        return True

    # 删除文件
    def DeleteFile(self, get):
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if not os.path.exists(get.path) and not os.path.islink(get.path):
            return public.returnMsg(False, 'FILE_NOT_EXISTS')

        # 检查关键文件
        msg = self.CheckDelete(get.path)
        if msg is not None:
            return public.returnMsg(False, msg)

        # 检查是否为.user.ini
        if get.path.find('.user.ini') != -1:
            public.ExecShell("chattr -i '" + get.path + "'")
        try:
            from BTPanel import session
            if os.path.exists('data/recycle_bin.pl') and session.get('debug') != 1:
                if self.Mv_Recycle_bin(get):
                    self.site_path_safe(get)
                    self.remove_file_ps(get)
                    public.add_security_logs("删除文件", " 删除文件:" + get.path)
                    return public.returnMsg(True, 'FILE_MOVE_RECYCLE_BIN')
            os.remove(get.path)
            self.site_path_safe(get)
            public.WriteLog('TYPE_FILE', 'FILE_DEL_SUCCESS', (get.path,))
            public.add_security_logs("删除文件", " 删除文件:" + get.path)
            self.remove_file_ps(get)
            return public.returnMsg(True, 'FILE_DEL_SUCCESS')
        except:
            return public.returnMsg(False, 'FILE_DEL_ERR')

    def remove_file_ps(self, get):
        '''
            @name 删除文件或目录的备注信息
        '''
        get.filename = get.path
        get.ps_body = ''
        get.ps_type = '0'
        self.set_file_ps(get)

    # 移动到回收站
    def Mv_Recycle_bin(self, get):
        if not os.path.islink(get.path):
            get.path = os.path.realpath(get.path)
        rPath = public.get_recycle_bin_path(get.path)
        rFile = os.path.join(rPath, get.path.replace('/', '_bt_') + '_t_' + str(time.time()))
        try:
            import shutil
            shutil.move(get.path, rFile)
            public.WriteLog('TYPE_FILE', 'FILE_MOVE_RECYCLE_BIN', (get.path,))
            return True
        except:
            public.WriteLog(
                'TYPE_FILE', 'FILE_MOVE_RECYCLE_BIN_ERR', (get.path,))
            return False

    # 从回收站恢复
    def Re_Recycle_bin(self, get):
        try:
            if sys.version_info[0] == 2:
                get.path = get.path.encode('utf-8')
            get.path = public.html_decode(get.path).replace(';', '')

            dFile = get.path.replace('_bt_', '/').split('_t_')[0]
            # 检查所在回收站目录
            recycle_bin_list = public.get_recycle_bin_list()
            _ok = False
            for r_path in recycle_bin_list:
                for r_file in os.listdir(r_path):
                    if get.path == r_file:
                        _ok = True
                        rPath = r_path
                        get.path = os.path.join(rPath, get.path)
                        break
                if _ok: break
            if hasattr(get, 'rpath') and get.rpath != '':
                dFile = get.rpath
            if dFile.find('BTDB_') != -1:
                import database
                try:
                    return database.database().RecycleDB(get.path)
                except:
                    pass
            try:
                import shutil
                if os.path.isdir(get.path) and os.path.exists(dFile):
                    shutil.move(dFile, dFile + "_{}.bak".format(public.format_date("%Y%m%d%H%M%S")))
                shutil.move(get.path, dFile)
                public.WriteLog('TYPE_FILE', 'FILE_RE_RECYCLE_BIN', (dFile,))
                return public.returnMsg(True, 'FILE_RE_RECYCLE_BIN')
            except:
                public.WriteLog('TYPE_FILE', 'FILE_RE_RECYCLE_BIN_ERR', (dFile,))
                return public.returnMsg(False, 'FILE_RE_RECYCLE_BIN_ERR')
        except:
            return public.returnMsg(False, traceback.format_exc())

    # 获取回收站信息
    def Get_Recycle_bin(self, get):
        try:
            p = int(get.p) if hasattr(get, 'p') else 1
            data = {'list': []}
            dirs = []
            files = []
            data['status'] = os.path.exists('data/recycle_bin.pl')
            data['status_db'] = os.path.exists('data/recycle_bin_db.pl')
            recycle_bin_list = public.get_recycle_bin_list()
            for rPath in recycle_bin_list:
                if not os.path.exists(rPath): continue
                for file in os.listdir(rPath):
                    try:
                        tmp = {}
                        fname = os.path.join(rPath, file)
                        if sys.version_info[0] == 2:
                            fname = fname.encode('utf-8')
                        else:
                            fname.encode('utf-8')
                        tmp1 = file.split('_bt_')
                        tmp2 = tmp1[len(tmp1) - 1].split('_t_')
                        file = self.xssencode(file)
                        tmp['rname'] = file
                        tmp['dname'] = file.replace('_bt_', '/').split('_t_')[0]
                        if tmp['dname'].find('@') != -1:
                            tmp['dname'] = "BTDB_" + tmp['dname'][5:].replace('@', "\\u").encode().decode(
                                "unicode_escape")
                        tmp['name'] = tmp2[0]
                        tmp['time'] = int(float(tmp2[1]))
                        if os.path.islink(fname):
                            filePath = os.readlink(fname)
                            if os.path.exists(filePath):
                                tmp['size'] = os.path.getsize(filePath)
                            else:
                                tmp['size'] = 0
                        else:
                            tmp['size'] = os.path.getsize(fname)
                        if os.path.isdir(fname):
                            if file[:5] == 'BTDB_':
                                tmp['size'] = public.get_path_size(fname)
                            dirs.append(tmp)
                        else:
                            files.append(tmp)
                    except:
                        continue
            dirs = sorted(dirs, key=lambda x: x['time'], reverse=True)
            for i in dirs:
                i['is_dir'] = True
            files = sorted(files, key=lambda x: x['time'], reverse=True)
            for i in files:
                i['is_dir'] = False
            data['all'] = len([i for i in (dirs + files) if i['rname'][:5] != 'BTDB_'])
            data['dir'] = len([i for i in dirs if i['rname'][:5] != 'BTDB_'])
            data['file'] = len(files)
            data['image'] = len([i for i in files if i['name'].split('.')[-1] in self.file_map['images']])
            data['ont_text'] = len([i for i in files if i['name'].split('.')[-1] in self.file_map['ont_text']])
            data['db'] = len([i for i in dirs if i['rname'][:5] == 'BTDB_'])
            if hasattr(get, 'type') and get.type != '':
                if get.type == 'all':
                    data['list'] = [i for i in (dirs + files) if i['rname'][:5] != 'BTDB_']
                elif get.type == 'dir':
                    data['list'] = [i for i in dirs if i['rname'][:5] != 'BTDB_']
                elif get.type == 'file':
                    data['list'] = files
                elif get.type == 'db':
                    data['list'] = [i for i in dirs if i['rname'][:5] == 'BTDB_']
                elif get.type == 'image':
                    data['list'] = [i for i in files if i['name'].split('.')[-1] in self.file_map['images']]
                elif get.type == 'ont_text':
                    data['list'] = [i for i in files if i['name'].split('.')[-1] in self.file_map['ont_text']]
            else:
                data['list'] = dirs + files
            data['search_num'] = len(data['list'])
            if hasattr(get, 'search') and get.search != '':
                data['list'] = [i for i in data['list'] if i['name'].find(get.search) != -1]
                data['search_num'] = len(data['list'])
            if hasattr(get, 'time_search') and len(get.time_search):
                time_search = json.loads(get.time_search)
                if len(time_search):
                    llist = []
                    start_time = int(time_search[0])
                    end_time = int(time_search[1])
                    for i in data['list']:
                        if int(i['time']) >= start_time and int(i['time']) <= end_time:
                            llist.append(i)
                    data['list'] = llist
                    data['search_num'] = len(data['list'])
            if hasattr(get, 'limit') and get.limit != '':
                limit = int(get.limit)
            else:
                limit = 10
            data['all_size'] = sum([i['size'] for i in data['list']])
            data['page'] = self.get_page_with_limit_pages(len(data['list']), p, limit, limit_pages=3 * 2)['page']
            data['list'] = data['list'][(p - 1) * limit:p * limit]
            order = 'time'
            if hasattr(get, 'order') and get.order != '':
                if get.order in ['name', 'time', 'size']:
                    order = get.order
            reverse = True
            if hasattr(get, 'reverse') and reverse != '':
                if get.reverse in ['0', '1']:
                    reverse = True if int(get.reverse) else False
            data['list'] = sorted(data['list'], key=lambda x: x[order], reverse=reverse)
            return data
        except Exception as e:
            if e.errno == 13:
                return public.returnMsg(False, "创建回收站目录失败，请去除www目录的锁")
            return public.returnMsg(False, "获取回收站信息失败: {}".format(e))

    def download_file(self, get):
        try:
            if not os.path.exists('/.Recycle_bin/download'):
                public.ExecShell('mkdir -p /.Recycle_bin/download')
            public.ExecShell('rm -rf /.Recycle_bin/download/*')
            if not hasattr(get, 'rname'):
                return public.returnMsg(False, '参数错误')
            if not hasattr(get, 'name'):
                return public.returnMsg(False, '参数错误')
            rname = get.rname.strip()
            name = get.name.strip()

            file_path = None
            recycle_bin_list = public.get_recycle_bin_list()
            for recycle_bin in recycle_bin_list:
                file_path = os.path.join(recycle_bin, rname)
                if os.path.exists(file_path):
                    break
            if file_path is None or not os.path.exists(file_path):
                public.returnMsg(False, "找不到文件！")

            download_path = os.path.join("/.Recycle_bin/download", name)
            if not os.path.exists(download_path):
                public.ExecShell("chmod +777 /.Recycle_bin/*")
                shutil.copyfile(file_path, download_path)

            data = {"path": download_path}
            res = self.GetDirNew(public.to_dict_obj({'p': 1, 'showRow': 500, 'path': '/.Recycle_bin/download', 'is_operating': True, 'search': ''}))['files']
            data['file'] = [i for i in res if i['nm'] == name][0]
            return public.returnMsg(True, data)
        except:
            return public.returnMsg(False, '找不到文件!')

    # 彻底删除
    def Del_Recycle_bin(self, get):
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        get.path = public.html_decode(get.path).replace(';', '')
        dFile = get.path.split('_t_')[0]
        # 检查所在回收站目录
        recycle_bin_list = public.get_recycle_bin_list()
        _ok = False
        for r_path in recycle_bin_list:
            for r_file in os.listdir(r_path):
                if get.path == r_file:
                    _ok = True
                    rPath = r_path
                    filename = os.path.join(rPath, get.path)
                    break
            if _ok: break

        tfile = get.path.replace('_bt_', '/').split('_t_')[0]
        if not _ok: return public.returnMsg(False, '从回收站删除文件失败: {}'.format(tfile))

        if dFile.find('BTDB_') != -1:
            import database
            return database.database().DeleteTo(filename)
        if not self.CheckDir(filename):
            return public.returnMsg(False, 'FILE_DANGER')

        public.ExecShell('chattr -R -i ' + filename)
        if os.path.isdir(filename):
            import shutil
            try:
                shutil.rmtree(filename)
            except:
                public.ExecShell('chattr -R -a ' + filename)
                public.ExecShell("rm -rf " + filename)
        else:
            try:
                os.remove(filename)
            except:
                public.ExecShell("rm -f " + filename)
        public.WriteLog('TYPE_FILE', 'FILE_DEL_RECYCLE_BIN', (tfile,))
        return public.returnMsg(True, 'FILE_DEL_RECYCLE_BIN', (tfile,))

    # 清空回收站
    def Close_Recycle_bin(self, get):

        import database
        import shutil

        recycle_bin_list = public.get_recycle_bin_list()
        for rPath in recycle_bin_list:
            public.ExecShell('chattr -R -i ' + rPath)
            rlist = os.listdir(rPath)
            i = 0
            l = len(rlist)
            for name in rlist:
                i += 1
                path = os.path.join(rPath, name)
                public.writeSpeed(name, i, l)
                if name.find('BTDB_') != -1:
                    database.database().DeleteTo(path, is_rec=True)
                    continue
                if os.path.isdir(path):
                    try:
                        shutil.rmtree(path)
                    except:
                        public.ExecShell('chattr -R -a ' + path)
                        public.ExecShell('rm -rf ' + path)
                else:
                    try:
                        os.remove(path)
                    except:
                        public.ExecShell('rm -f ' + path)

        public.writeSpeed(None, 0, 0)
        public.WriteLog('TYPE_FILE', 'FILE_CLOSE_RECYCLE_BIN')
        return public.returnMsg(True, 'FILE_CLOSE_RECYCLE_BIN')

    def Del_Recycle_bin_new(self, get):
        import database
        database = database.database()
        force = 0
        if 'force' in get:
            force = get.force
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        get.path = public.html_decode(get.path).replace(';', '')
        dFile = get.path.split('_t_')[0]
        # 检查所在回收站目录
        recycle_bin_list = public.get_recycle_bin_list()
        _ok = False
        for r_path in recycle_bin_list:
            for r_file in os.listdir(r_path):
                if get.path == r_file:
                    _ok = True
                    rPath = r_path
                    filename = os.path.join(rPath, get.path)
                    break
            if _ok: break

        tfile = get.path.replace('_bt_', '/').split('_t_')[0]
        if not _ok: return public.returnMsg(False, '从回收站删除文件失败: {}'.format(tfile))
        if dFile.startswith('BTDB_') and os.path.exists("/www/server/data/" + dFile.replace("BTDB_", "").split('_t_')[0]) and not force:
            return {'status': False, 'msg': "检测到存在同名数据库强制删除会删除同名数据库，如需删除请检查后强制删除", 'tag': 1}
        if not self.CheckDir(filename):
            return public.returnMsg(False, 'FILE_DANGER')

        status, total_size, total_num = self.is_max_size(filename, 1024 * 1024 * 500, 20000, 0, 0)
        if status:
            import panelTask
            task_obj = panelTask.bt_task()
            public.run_thread(task_obj.create_task,
                              ('删除回收站文件', 10, "", json.dumps(
                                  {"filenames": [filename]})))
            return public.returnMsg(True, '已将删除文件任务添加到消息队列!')

        if dFile.startswith('BTDB_'):
            return database.DeleteTo(filename)
        public.ExecShell('chattr -R -i ' + filename)
        if os.path.isdir(filename):
            import shutil
            try:
                shutil.rmtree(filename)
            except:
                public.ExecShell('chattr -R -a ' + filename)
                public.ExecShell("rm -rf " + filename)
        else:
            try:
                os.remove(filename)
            except:
                public.ExecShell("rm -f " + filename)
        public.WriteLog('TYPE_FILE', 'FILE_DEL_RECYCLE_BIN', (tfile,))
        return public.returnMsg(True, 'FILE_DEL_RECYCLE_BIN', (tfile,))

    # 清空回收站--
    def Close_Recycle_bin_new(self, get):
        if get.type == 'db':
            import database
            database = database.database()
            force = 0
            if 'force' in get:
                force = get.force
        recycle_bin_list = public.get_recycle_bin_list()
        fail_list = []
        # 计算大小
        ts = 0
        tn = 0
        if get.type == 'db':
            s_shell = 'du -sb {}BTDB_* '
            n_shell = 'find {} -type f  -path "{}BTDB_*/**" | wc -l'
        else:
            s_shell = 'du -sb {} --exclude="BTDB_*"'
            n_shell = 'find {} -type f  ! -path "{}BTDB_*/**" | wc -l'
        for rPath in recycle_bin_list:
            for name in os.listdir(rPath):
                if name.startswith('BTDB_') and get.type == 'db':
                    if os.path.exists("/www/server/data/" + name.replace("BTDB_", "").split('_t_')[0]) and not force:
                        fail_list.append(name)
                        continue
            try:
                total_size = int(public.ExecShell(s_shell.format(rPath))[0].split()[0])
            except:
                total_size = 0
            try:
                total_num = int(public.ExecShell(n_shell.format(rPath, rPath))[0].split()[0])
            except:
                total_num = 99999
            ts += total_size
            tn += total_num
        if fail_list:
            return {"status": True, "msg": "检测到存在同名数据库强制删除会删除同名数据库，如需删除请检查后强制删除",
                    "fail_list": fail_list}
        if ts > 1024 * 1024 * 500 or tn > 20000:
            import panelTask
            task_obj = panelTask.bt_task()
            public.run_thread(task_obj.create_task,
                              ('清空回收站', 9, "", json.dumps({"ctype": get.type, "recycle_bin_list": recycle_bin_list})))
            return public.returnMsg(True, '已将清空回收站任务添加到消息队列!')
        for rPath in recycle_bin_list:
            public.ExecShell('chattr -R -i ' + rPath)
            rlist = os.listdir(rPath)
            i = 0
            l = len(rlist)
            for name in rlist:
                i += 1
                path = os.path.join(rPath, name)
                public.writeSpeed(name, i, l)
                if name.startswith('BTDB_') and get.type == 'db':
                    database.DeleteTo(path)
                elif not name.startswith('BTDB_') and get.type == 'files':
                    if os.path.isdir(path):
                        try:
                            shutil.rmtree(path)
                        except:
                            public.ExecShell('chattr -R -a ' + path)
                            public.ExecShell('rm -rf ' + path)
                    else:
                        try:
                            os.remove(path)
                        except:
                            public.ExecShell('rm -f ' + path)
        public.writeSpeed(None, 0, 0)
        public.WriteLog('TYPE_FILE', 'FILE_CLOSE_RECYCLE_BIN')
        return {"status": True, "msg": "已清空回收站!", "fail_list": fail_list}

    def Batch_Del_Recycle_bin(self, get):
        import database
        database = database.database()
        force = 0
        if 'force' in get:
            force = get.force
        path_lsit = get.path_list.split(',')
        data = {'status': True, 'success': [], 'error': {}}
        filenames = []
        ts = 0
        tn = 0
        for path in path_lsit:
            if path.startswith('BTDB_'):
                if os.path.exists("/www/server/data/" + path.replace("BTDB_", "").split('_t_')[0]) and not force:
                    data['error'].update({path.split('_t_')[0]: "存在同名数据库，删除失败"})
                    continue
            for rPath in public.get_recycle_bin_list():
                filename = os.path.join(rPath, path)
                if os.path.exists(filename):
                    status, total_size, total_num = self.is_max_size(filename, 1024 * 1024 * 500, 20000, 0, 0)
                    ts += total_size
                    tn += total_num
                    filenames.append(filename)
                    break
        if ts > 1024 * 1024 * 500 or tn > 20000:
            import panelTask
            task_obj = panelTask.bt_task()
            public.run_thread(task_obj.create_task,
                              ('删除回收站文件', 10, "", json.dumps(
                                  {"filenames": filenames})))
            if data['error']:
                errmsg = "数据库[{}]存在同名数据库，无法批量删除，请检查后强制删除".format(', '.join(data['error'].keys()))
            else:
                errmsg = ""
            return public.returnMsg(True, '已将删除文件任务添加到消息队列!{}'.format(errmsg))
        for filename in filenames:
            if os.path.basename(filename).startswith('BTDB_'):
                database.DeleteTo(filename)
                data['success'].append(os.path.basename(filename).split('_t_')[0])
                continue
            public.ExecShell('chattr -R -i ' + filename)
            if os.path.isdir(filename):
                try:
                    shutil.rmtree(filename)
                except:
                    public.ExecShell('chattr -R -a ' + filename)
                    public.ExecShell("rm -rf " + filename)
            else:
                try:
                    os.remove(filename)
                except:
                    public.ExecShell("rm -f " + filename)
            data['success'].append(os.path.basename(filename).split('_t_')[0])

        if data['success']:
            data['msg'] = "删除{}成功".format(data['success'])
            data['status'] = True
        else:
            data['msg'] = "删除失败"
            data['status'] = False
        return data

    # 回收站开关
    def Recycle_bin(self, get):
        c = 'data/recycle_bin.pl'
        if hasattr(get, 'db'):
            c = 'data/recycle_bin_db.pl'
        if os.path.exists(c):
            os.remove(c)
            public.WriteLog('TYPE_FILE', 'FILE_OFF_RECYCLE_BIN')
            return public.returnMsg(True, 'FILE_OFF_RECYCLE_BIN')
        else:
            public.writeFile(c, 'True')
            public.WriteLog('TYPE_FILE', 'FILE_ON_RECYCLE_BIN')
            return public.returnMsg(True, 'FILE_ON_RECYCLE_BIN')

    # 复制文件
    def CopyFile(self, get):
        if sys.version_info[0] == 2:
            get.sfile = get.sfile.encode('utf-8')
            get.dfile = get.dfile.encode('utf-8')
        if get.dfile[-1] == '.':
            return public.returnMsg(False, '文件结尾不建议使用 "."，因为可能存在安全隐患')
        if not os.path.exists(get.sfile):
            return public.returnMsg(False, 'FILE_NOT_EXISTS')

        # if os.path.exists(get.dfile):
        #    return public.returnMsg(False,'FILE_EXISTS')

        if get.dfile == get.sfile:
            return public.returnMsg(False, '无意义操作')

        status, total_size, total_num = self.is_max_size(get.sfile, 1024 * 1024 * 500, 20000, 0, 0)
        if status:
            import panelTask
            task_obj = panelTask.bt_task()
            public.run_thread(task_obj.create_task,
                              ('复制文件', 8, get.sfile, json.dumps(
                                  {"sfile": get.sfile, "dfile": get.dfile})))
            return public.returnMsg(True, '已将复制文件任务添加到消息队列!')

        if os.path.isdir(get.sfile):
            return self.CopyDir(get)

        import shutil
        try:
            shutil.copyfile(get.sfile, get.dfile)
            public.WriteLog('TYPE_FILE', 'FILE_COPY_SUCCESS',
                            (get.sfile, get.dfile))
            stat = os.stat(get.sfile)
            os.chmod(get.dfile, stat.st_mode)
            os.chown(get.dfile, stat.st_uid, stat.st_gid)
            return public.returnMsg(True, 'FILE_COPY_SUCCESS')
        except shutil.SameFileError:
            return public.returnMsg(True, 'FILE_COPY_SUCCESS')
        except PermissionError:
            return public.returnMsg(False, "文件复制失败，请检查目录是否被锁或开启了防篡改")
        except OSError as e:
            if 'Read-only' in str(e):
                return public.returnMsg(False, "当前目录为只读权限")
            else:
                return public.returnMsg(False, "文件复制失败:{}".format(str(e)))
        except:
            return public.returnMsg(False, 'FILE_COPY_ERR')

    # 复制文件夹
    def CopyDir(self, get):
        if sys.version_info[0] == 2:
            get.sfile = get.sfile.encode('utf-8')
            get.dfile = get.dfile.encode('utf-8')
        if get.dfile[-1] == '.':
            return public.returnMsg(False, '目录结尾不建议使用 "."，因为可能存在安全隐患')
        if not os.path.exists(get.sfile):
            return public.returnMsg(False, 'DIR_NOT_EXISTS')

        # if os.path.exists(get.dfile):
        #    return public.returnMsg(False,'DIR_EXISTS')

        # if not self.CheckDir(get.dfile):
        #    return public.returnMsg(False,'FILE_DANGER')

        try:
            self.copytree(get.sfile, get.dfile)
            stat = os.stat(get.sfile)
            os.chmod(get.dfile, stat.st_mode)
            os.chown(get.dfile, stat.st_uid, stat.st_gid)
            public.WriteLog('TYPE_FILE', 'DIR_COPY_SUCCESS',
                            (get.sfile, get.dfile))
            return public.returnMsg(True, 'DIR_COPY_SUCCESS')
        except PermissionError:
            return public.returnMsg(False, "文件夹复制失败，请检查目录是否被锁或开启了防篡改")
        except OSError as e:
            if 'Read-only' in str(e):
                return public.returnMsg(False, "当前目录为只读权限")
            else:
                return public.returnMsg(False, "文件夹复制失败:{}".format(str(e)))
        except:
            return public.returnMsg(False, 'DIR_COPY_ERR')

    # 移动文件或目录
    def MvFile(self, get):
        if sys.version_info[0] == 2:
            get.sfile = get.sfile.encode('utf-8')
            get.dfile = get.dfile.encode('utf-8')
        if get.dfile[-1] == '.':
            return public.returnMsg(False, '文件结尾不建议使用 "."，因为可能存在安全隐患')
        if not self.CheckFileName(get.dfile):
            return public.returnMsg(False, '文件名中不能包含特殊字符!')
        if os.path.basename(get.sfile) == '.Recycle_bin':
            return public.returnMsg(False, '不能直接操作回收站目录，请在右上角按【回收站】按钮打开')
        if not os.path.exists(get.sfile):
            return public.returnMsg(False, 'FILE_NOT_EXISTS')

        if get.dfile == get.sfile:
            return public.returnMsg(False, '无意义操作')

        if hasattr(get, 'rename'):
            if os.path.exists(get.dfile):
                return public.returnMsg(False, '目标文件名已存在!')

        if get.dfile[-1] == '/':
            get.dfile = get.dfile[:-1]

        if not self.CheckDir(get.sfile):
            return public.returnMsg(False, 'FILE_DANGER')
        try:
            file_checker = self._check_tamper_proof_file(get.sfile, get.dfile)
            self.move(get.sfile, get.dfile, file_checker)
            self.site_path_safe(get)
            if hasattr(get, 'rename'):
                public.WriteLog('TYPE_FILE', '[%s]重命名为[%s]' % (get.sfile, get.dfile))
                return public.returnMsg(True, '重命名成功!')
            else:
                public.WriteLog('TYPE_FILE', 'MOVE_SUCCESS',
                                (get.sfile, get.dfile))
                return public.returnMsg(True, 'MOVE_SUCCESS')
        except PermissionError:
            return public.returnMsg(False, "文件移动失败，请检查目录是否被锁或开启了防篡改")
        except OSError as e:
            if 'Read-only' in str(e):
                return public.returnMsg(False, "当前目录为只读权限")
            elif e.errno == 36:
                return public.returnMsg(False, "修改后的文件名过长")
            else:
                return public.returnMsg(False, 'MOVE_ERR')
        except:
            return public.returnMsg(False, 'MOVE_ERR')

    # 检查文件是否存在
    def CheckExistsFiles(self, get):
        from BTPanel import session
        if sys.version_info[0] == 2:
            get.dfile = get.dfile.encode('utf-8')
        data = []
        filesx = []
        if not hasattr(get, 'filename'):
            if not 'selected' in session:
                return []
            filesx = json.loads(session['selected']['data'])
        else:
            filesx.append(get.filename)

        for fn in filesx:
            if fn == '.':
                continue
            filename = get.dfile + '/' + fn
            if os.path.exists(filename):
                tmp = {}
                stat = os.stat(filename)
                tmp['filename'] = fn
                tmp['size'] = os.path.getsize(filename)
                tmp['mtime'] = str(int(stat.st_mtime))
                tmp['is_dir'] = os.path.isdir(filename)
                data.append(tmp)
        return data

    # 取文件扩展名
    def __get_ext(self, filename):
        tmp = filename.split('.')
        return tmp[-1]

    # 获取文件内容
    def GetFileBody(self, get):
        if not hasattr(get, "path"):
            return public.returnMsg(False, "缺少参数! path")
        from urllib.parse import unquote

        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        get.path = urllib.parse.unquote(get.path)
        get.path = html.escape(get.path)
        get.path = self.xssdecode(get.path)
        if get.path.find('/rewrite/null/') != -1:
            webserver = public.get_webserver()
            get.path = get.path.replace("/rewrite/null/", "/rewrite/{}/".format(webserver))
        if get.path.find('/vhost/null/') != -1:
            webserver = public.get_webserver()
            get.path = get.path.replace("/vhost/null/", "/vhost/{}/".format(webserver))

        if not os.path.exists(get.path):
            if get.path.find('rewrite') == -1:
                return public.returnMsg(False, 'FILE_NOT_EXISTS', (get.path,))
            public.writeFile(get.path, '')

        if self.__get_ext(get.path) in ['gz', 'zip', 'rar', 'exe', 'db', 'pdf', 'doc', 'xls', 'docx', 'xlsx', 'ppt',
                                        'pptx', '7z', 'bz2', 'png', 'gif', 'jpg', 'jpeg', 'bmp', 'icon', 'ico', 'pyc',
                                        'class', 'so', 'pyd']:
            return public.returnMsg(False, '该文件格式不支持在线编辑!')

        # if os.path.getsize(get.path) > 3145928:
        #     return public.returnMsg(False, u'不能在线编辑大于3MB的文件!')
        if os.path.isdir(get.path):
            return public.returnMsg(False, '这不是一个文件!')

        if not os.path.exists(get.path):
            return public.returnMsg(False, 'FILE_NOT_EXISTS', (get.path,))

        # 获取文件状态
        f_stat = os.stat(get.path)
        if stat.S_ISSOCK(f_stat.st_mode):
            return public.returnMsg(False, "套接字文件不能在线编辑")

        data = {}
        data['status'] = True
        data["only_read"] = False
        data["size"] = os.path.getsize(get.path)

        req_data = {
            "PATH": os.path.dirname(get.path),
            "DIR": [],
            "FILES": [os.path.basename(get.path)],
        }
        resp = self._check_tamper(req_data)

        tamper_data = resp.get("tamper_data", {})
        tamper_status = tamper_data.get("files", [])
        close_status = os.path.exists("{}/tamper/close_temp.pl".format(public.get_setup_path()))
        if not close_status and len(tamper_status) != 0:
            if str(tamper_status[0]).startswith("1") and self._check_tamper_white() is False:
                data['msg'] = "当前文件已开启防篡改，不支持编辑！"
                data["only_read"] = True

        # 处理my.cnf为空的情况
        myconf_file = '/etc/my.cnf'
        if get.path == myconf_file:
            if os.path.getsize(myconf_file) < 10:
                mycnf_file_bak = '/etc/my.cnf.bak'
                if os.path.exists(mycnf_file_bak):
                    public.writeFile(myconf_file, public.readFile(mycnf_file_bak))

        if data["size"] > 3145928:
            try:
                data["next"] = True
                if "mode" in get and "p" in get:
                    if get.mode == "reverse":
                        info_data = public.GetNumLines(get.path, 1000, int(get.p)).split("\n")
                        info_data.reverse()
                        info_data = "\n".join(info_data)

                        if info_data == "":
                            data["next"] = False
                else:
                    info_data = self.last_lines(get.path, 1000)
                data["data"] = info_data
                data["only_read"] = True
            except:
                return public.returnMsg(False, u'文件编码不被兼容，无法正确读取文件!')
        else:
            try:
                fp = open(get.path, 'rb')
                if fp:
                    data['encoding'] = 'utf-8'
                    if chardet:
                        chardet_data = fp.read(1024)
                        res = chardet.detect(chardet_data)
                        if res and res['confidence'] > 0.9:
                            data['encoding'] = res['encoding']
                        fp.seek(0)
                    srcBody = fp.read()
                    fp.close()
                    try:
                        data['data'] = srcBody.decode(data['encoding'])
                    except:
                        try:
                            data['encoding'] = 'utf-8'
                            data['data'] = srcBody.decode(data['encoding'])
                        except:
                            try:
                                data['encoding'] = 'GBK'
                                data['data'] = srcBody.decode(data['encoding'])
                            except:
                                try:
                                    data['encoding'] = 'BIG5'
                                    data['data'] = srcBody.decode(data['encoding'])
                                except:
                                    return public.returnMsg(False, u'文件编码不被兼容，无法正确读取文件!')
            except OSError as e:
                return public.returnMsg(False, '打开文件失败，文件可能被其它进程占用!')
            except Exception as e:
                return public.returnMsg(False, '打开文件失败，{}'.format(str(e)))
        if hasattr(get, 'filename'):
            get.path = get.filename

        if not os.path.exists(get.path):
            return public.returnMsg(False, 'FILE_NOT_EXISTS')

        data['historys'] = self.get_history(get.path)
        data['auto_save'] = self.get_auto_save(get.path)
        data['st_mtime'] = str(int(os.stat(get.path).st_mtime))
        return data

    def last_lines(self, filename, lines=1):
        '''
            @name 获取文件最后几行
            @param filename str 文件名
            @param lines int 行数
            @return str
        '''
        max_len = 512 * lines
        with open(filename, 'rb') as f:
            f.seek(0, 2)
            pos = f.tell()
            max_size = min(pos, max_len)
            f.seek(-max_size,1)
            data = f.read(max_size)

        return data.decode('utf-8', errors='ignore')


    # 保存文件
    def SaveFileBody(self, get):
        if not 'path' in get:
            return public.returnMsg(False, 'path参数不能为空!')
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')

        if get.path.find('/rewrite/null/') != -1:
            webserver = public.get_webserver()
            get.path = get.path.replace("/rewrite/null/", "/rewrite/{}/".format(webserver))
        if get.path.find('/vhost/null/') != -1:
            webserver = public.get_webserver()
            get.path = get.path.replace("/vhost/null/", "/vhost/{}/".format(webserver))

        if not os.path.exists(get.path):
            if get.path.find('.htaccess') == -1:
                return public.returnMsg(False, 'FILE_NOT_EXISTS')
        elif os.path.getsize(get.path) > 3145928:
            return public.returnMsg(False, '不能在线编辑大于3MB的文件!')

        nginx_conf_path = public.get_vhost_path() + '/nginx/'
        if get.path.find(nginx_conf_path) != -1:
            if get.data.find('#SSL-START') != -1 and get.data.find('#SSL-END') != -1:
                if get.data.find('#error_page 404/404.html;') == -1:
                    return public.returnMsg(False,
                                            '配置文件保存失败：<p style="color:red;">请勿修改SSL相关配置中注释的404规则</p><p>要修改404配置，找到以下配置位置：</p><pre>#ERROR-PAGE-START  错误页配置</pre>')

        if 'st_mtime' in get:
            if not 'force' in get or get['force'] != '1':
                st_mtime = str(int(os.stat(get.path).st_mtime))
                if st_mtime != get['st_mtime']:
                    return public.returnMsg(False,
                                            '保存失败，{}文件发生改变，可能是该文件已经被其他人修改，请刷新内容后重新修改.'.format(
                                                get.path))

        his_path = '/www/backup/file_history/'
        if get.path.find(his_path) != -1:
            return public.returnMsg(False, '不能直接修改历史副本!')
        try:
            if 'base64' in get:
                import base64
                get.data = base64.b64decode(get.data)
            isConf = -1
            skip_conf_check = False
            if "skip_conf_check" in get and get.skip_conf_check in ("1", 1, "true", "True", True):
                skip_conf_check = True
            if not skip_conf_check and (os.path.exists('/etc/init.d/nginx') or os.path.exists('/etc/init.d/httpd')):
                isConf = get.path.find('nginx')
                if isConf == -1:
                    isConf = get.path.find('apache')
                if isConf == -1:
                    isConf = get.path.find('rewrite')
                if isConf != -1:
                    public.ExecShell('\\cp -a ' + get.path + ' /tmp/backup.conf')

            data = get.data
            if data == 'undefined': return public.returnMsg(False, '错误的文件内容,请重新保存!')
            userini = False
            if get.path.find('.user.ini') != -1:
                userini = True
                public.ExecShell('chattr -i ' + get.path)

            if get.path.find('/www/server/cron') != -1:
                try:
                    import crontab
                    data = crontab.crontab().CheckScript(data)
                except:
                    pass

            if get.encoding == 'ascii' or get.encoding == 'ansi':
                get.encoding = 'utf-8'

            self.save_history(get.path)
            try:
                if sys.version_info[0] == 2:
                    data = data.encode(get.encoding, errors='ignore')
                    fp = open(get.path, 'w+')
                else:

                    data = data.encode(get.encoding, errors='ignore').decode(get.encoding)
                    fp = open(get.path, 'w+', encoding=get.encoding)
            except:
                fp = open(get.path, 'w+')
            data = self.crlf_to_lf(data, get.path)
            fp.write(data)
            fp.close()

            if isConf != -1:
                isError = public.checkWebConfig()
                if isError != True:
                    public.ExecShell('\\cp -a /tmp/backup.conf ' + get.path)
                    res = public.returnMsg(False, '保存失败，因为检测到被修改的配置文件存在错误:<br><pre style="color:red;white-space: pre-line;">' + isError + '</pre>')
                    res["conf_check"] = 1
                    return res
                public.serviceReload()

            if userini:
                public.ExecShell('chattr +i ' + get.path)

            public.WriteLog('TYPE_FILE', 'FILE_SAVE_SUCCESS', (get.path,))
            data = public.returnMsg(True, 'FILE_SAVE_SUCCESS')
            data['historys'] = self.get_history(get.path)  # 获取历史记录
            data['st_mtime'] = str(int(os.stat(get.path).st_mtime))
            if get.path.find("php.ini") != -1:
                vistion = get.path.replace("/www/server/php/", "")
                vistion = vistion.replace("/etc/php.ini", "")
                self.sync_php_config(vistion)
            return data
        except Exception as ex:
            return public.returnMsg(False, 'FILE_SAVE_ERR' + str(ex))

    def update_cors_config(self, get):
        try:
            # 获取原来的文件内容
            original_content = self.GetFileBody(get)['data']
            
            allowed_origins = get.get('allowed_origins', '*')
            allowed_methods = get.get('allowed_methods', 'GET, POST, OPTIONS')
            allowed_headers = get.get('allowed_headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range')
            exposed_headers = get.get('exposed_headers', 'Content-Length,Content-Range')
            max_age = get.get('max_age', '172800330')

            # 生成 CORS 配置内容
            cors_content = """
            add_header 'Access-Control-Allow-Origin' '{allowed_origins}';
            add_header 'Access-Control-Allow-Methods' '{allowed_methods}';
            add_header 'Access-Control-Allow-Headers' '{allowed_headers}';
            add_header 'Access-Control-Max-Age' '{max_age}';
            add_header 'Access-Control-Expose-Headers' '{exposed_headers}';
            if ($request_method = 'OPTIONS') {{
                return 204;
            }}
            """.format(allowed_origins=allowed_origins, allowed_methods=allowed_methods, allowed_headers=allowed_headers, exposed_headers=exposed_headers, max_age=max_age)

            # 如果是 Apache 配置
            if '/www/server/panel/vhost/apache/' in get['path']:
                cors_content = """
                # 跨域配置
                Header set Access-Control-Allow-Origin '{allowed_origins}'
                Header set Access-Control-Allow-Methods '{allowed_methods}'
                Header set Access-Control-Allow-Headers '{allowed_headers}'
                Header set Access-Control-Expose-Headers '{exposed_headers}'
                Header set Access-Control-Max-Age '{max_age}'
                """.format(allowed_origins=allowed_origins, allowed_methods=allowed_methods, allowed_headers=allowed_headers, exposed_headers=exposed_headers, max_age=max_age)

                pattern = r'(<Directory "/www/wwwroot/.*">)'
                new_content = re.sub(pattern, r'\1' + cors_content, original_content)
            
            # 如果是 Nginx 配置
            else:
                # 查找是否已经存在 CORS-START 和 CORS-END 标记
                cors_marker_pattern = r"#CORS-START[\s\S]*?#CORS-END"
                if re.search(cors_marker_pattern, original_content):
                    # 替换标记之间的内容
                    new_content = re.sub(cors_marker_pattern, f"#CORS-START\n{cors_content}#CORS-END", original_content, flags=re.DOTALL)
                else:
                    # 寻找 SSL 结束标记，#SSL-END
                    ssl_end_pattern = r"#SSL-END"
                    ssl_end_match = re.search(ssl_end_pattern, original_content)
                    
                    if ssl_end_match:
                        # 在 #SSL-END 之后插入 CORS 设置
                        insert_position = ssl_end_match.end()  # 找到 #SSL-END 之后的位置
                        new_content = original_content[:insert_position] + "\n\n#CORS-START\n" + cors_content + "#CORS-END\n" + original_content[insert_position:]
                    else:
                        # 如果没有找到 #SSL-END，则尝试在 server 块末尾之前插入
                        new_content = original_content.rsplit('}', 1)[0] + "\n#CORS-START\n" + cors_content + "#CORS-END\n}"
            
            # 更新 get 字典中的数据
            get['data'] = new_content

            # 调用 SaveFileBody 函数来保存新的文件内容
            save_result = self.SaveFileBody(get)
            
            if save_result['status']:
                return public.returnMsg(True, "修改成功！")
            else:
                return public.returnMsg(False, "保存失败：" + save_result.get('msg'))
        
        except Exception as e:
            return public.returnMsg(False, "修改失败！" + str(e))



    def delete_cors_config(self, get):
        try:
            # 获取原来的文件内容
            original_content = self.GetFileBody(get)['data']
            # 判断是 Apache 还是 Nginx 配置文件
            if '/www/server/panel/vhost/apache/' in get['path']:
                # Apache 配置文件
                # 检查是否存在带有 CORS 标记的配置
                if '#CORS-START' in original_content and '#CORS-END' in original_content:
                    # 使用逐行方式删除带有 CORS 标记的配置块
                    lines = original_content.split('\n')
                    new_lines = []
                    in_cors_block = False

                    for line in lines:
                        stripped_line = line.strip()
                        # 检测开始标记
                        if stripped_line == '#CORS-START':
                            in_cors_block = True
                            continue  # 跳过开始标记行
                        # 检测结束标记
                        if stripped_line == '#CORS-END':
                            in_cors_block = False
                            continue  # 跳过结束标记行
                        # 如果当前不在 CORS 配置块中，保留该行
                        if not in_cors_block:
                            new_lines.append(line)
                    # 将处理后的内容合并为字符串
                    updated_content = '\n'.join(new_lines)
                else:
                    # 未找到新标记的 CORS 配置，使用正则表达式删除旧的 CORS 配置
                    old_cors_pattern = r"# 跨域配置[\s\S]*?Header set Access-Control-Max-Age '[^']+'"
                    updated_content = re.sub(old_cors_pattern, '', original_content, flags=re.DOTALL)
            elif '/www/server/panel/vhost/nginx/' in get['path']:
                # Nginx 配置文件
                # 检查是否存在带有 CORS 标记的配置
                if '#CORS-START' in original_content and '#CORS-END' in original_content:
                    # 使用逐行方式删除带有 CORS 标记的配置块
                    lines = original_content.split('\n')
                    new_lines = []
                    in_cors_block = False

                    for line in lines:
                        stripped_line = line.strip()
                        # 检测开始标记
                        if stripped_line == '#CORS-START':
                            in_cors_block = True
                            continue  # 跳过开始标记行
                        # 检测结束标记
                        if stripped_line == '#CORS-END':
                            in_cors_block = False
                            continue  # 跳过结束标记行
                        # 如果当前不在 CORS 配置块中，保留该行
                        if not in_cors_block:
                            new_lines.append(line)
                    # 将处理后的内容合并为字符串
                    updated_content = '\n'.join(new_lines)
                else:
                    # 未找到新标记的 CORS 配置，使用正则表达式删除旧的 CORS 配置
                    cors_pattern = r"""
                    \s*add_header\s+'Access-Control-Allow-Origin'.*?;
                    \s*add_header\s+'Access-Control-Allow-Methods'.*?;
                    \s*add_header\s+'Access-Control-Allow-Headers'.*?;
                    \s*add_header\s+'Access-Control-Max-Age'.*?;
                    \s*add_header\s+'Access-Control-Expose-Headers'.*?;
                    \s*if\s+\(\$request_method\s*=\s*'OPTIONS'\)\s*\{\s*return\s*204;\s*\}
                    """
                    updated_content = re.sub(cors_pattern, '', original_content, flags=re.VERBOSE)
            else:
                return public.returnMsg(False, "未知的配置文件类型！")

            # 更新 get 字典中的数据
            get['data'] = updated_content

            # 保存修改后的文件
            save_result = self.SaveFileBody(get)

            if save_result['status']:
                return public.returnMsg(True, "关闭成功！")
            else:
                return public.returnMsg(False, "关闭失败：" + save_result.get('msg'))

        except Exception as e:
            return public.returnMsg(False, "关闭失败"+str(e))


    def view_cors_config(self, get):
        try:
            # 获取原来的文件内容
            original_content = self.GetFileBody(get)['data']

            match = None  # 初始化 match 变量
            exposed_headers, max_age = None, None  # 初始化头信息

            # 判断是 Apache 还是 Nginx 配置文件
            if '/www/server/panel/vhost/apache/' in get['path']:
                # Apache 配置文件，优先查找带有 CORS 标记的配置
                pattern_with_marker = r"#CORS-START[\s\S]*?Header set Access-Control-Allow-Origin '(.*?)'.*Header set Access-Control-Allow-Methods '(.*?)'.*Header set Access-Control-Allow-Headers '(.*?)'.*Header set Access-Control-Expose-Headers '(.*?)'.*Header set Access-Control-Max-Age '(.*?)'[\s\S]*?#CORS-END"
                match = re.search(pattern_with_marker, original_content, flags=re.DOTALL)

                # 如果没有找到带标记的 CORS 配置，查找旧配置
                if not match:
                    pattern = r"Header set Access-Control-Allow-Origin '(.*?)'.*Header set Access-Control-Allow-Methods '(.*?)'.*Header set Access-Control-Allow-Headers '(.*?)'.*Header set Access-Control-Expose-Headers '(.*?)'.*Header set Access-Control-Max-Age '(.*?)'"
                    match = re.search(pattern, original_content, flags=re.DOTALL)

                if match:
                    exposed_headers = match.group(4)
                    max_age = match.group(5)

            elif '/www/server/panel/vhost/nginx/' in get['path']:
                # Nginx 配置文件，优先查找带有 CORS 标记的配置
                pattern_with_marker = r"#CORS-START[\s\S]*?add_header 'Access-Control-Allow-Origin' '(.*?)'.*add_header 'Access-Control-Allow-Methods' '(.*?)'.*add_header 'Access-Control-Allow-Headers' '(.*?)'.*add_header 'Access-Control-Expose-Headers' '(.*?)'.*add_header 'Access-Control-Max-Age' '(.*?)'[\s\S]*?#CORS-END"
                match = re.search(pattern_with_marker, original_content, flags=re.DOTALL)

                # 如果没有找到带标记的 CORS 配置，查找旧配置
                if not match:
                    pattern = r"add_header 'Access-Control-Allow-Origin' '(.*?)'.*add_header 'Access-Control-Allow-Methods' '(.*?)'.*add_header 'Access-Control-Allow-Headers' '(.*?)'.*add_header 'Access-Control-Max-Age' '(.*?)'.*add_header 'Access-Control-Expose-Headers' '(.*?)'"
                    match = re.search(pattern, original_content, flags=re.DOTALL)

                if match:
                    exposed_headers = match.group(5)
                    max_age = match.group(4)
            else:
                return public.returnMsg(False, "未知的配置文件类型！")

            if match:
                allowed_origins = match.group(1)
                allowed_methods = match.group(2)
                allowed_headers = match.group(3)
                return public.returnMsg(True, [{
                    'allowed_origins': allowed_origins,
                    'allowed_methods': allowed_methods,
                    'allowed_headers': allowed_headers,
                    'exposed_headers': exposed_headers,
                    'max_age': max_age
                }])
            else:
                return public.returnMsg(True, [])
        except Exception as e:
            return public.returnMsg(False, "查看失败！" + str(e))

    def crlf_to_lf(self, data, filename):
        '''
            @name 将CRLF转换为LF
            @author hwliang
            @param data 要转换的数据
            @param filename 文件名
            @return string
        '''
        file_ext_name = os.path.splitext(filename)[-1]
        if not file_ext_name:
            if data.find('#!/bin/bash') == 0 or data.find('#!/bin/sh') == 0:
                file_ext_name = '.sh'
            elif data.find('#!/usr/bin/python') == 0 or data.find('import ') != -1:
                file_ext_name = '.py'
            elif data.find('#!/usr/bin/env node') == 0:
                file_ext_name = '.js'
            elif data.find('#!/usr/bin/env php') == 0 or data.find('<?php') != -1:
                file_ext_name = '.php'
            elif data.find('#!/usr/bin/env ruby') == 0:
                file_ext_name = '.rb'
            elif data.find('#!/usr/bin/env perl') == 0:
                file_ext_name = '.pl'
            elif data.find('#!/usr/bin/env lua') == 0 or data.find('require ') != -1:
                file_ext_name = '.lua'
            elif filename.find('/script/') != -1:
                file_ext_name = '.sh'
            elif filename.find('.') == -1:
                file_ext_name = '.sh'
        if not file_ext_name in ['.sh', '.py', '.pl', '.php', '.js', '.css', '.html', '.htm', '.shtml', '.shtm', '.jsp',
                                 '.asp', '.aspx', '.txt']:
            return data

        if data.find('\r\n') == -1 or data.find('\r') == -1:
            return data
        return data.replace('\r\n', '\n').replace('\r', '\n')

    # 保存历史副本
    def save_history(self, filename):
        if os.path.exists(public.get_panel_path() + '/data/not_file_history.pl'):
            return True
        try:
            his_path = '/www/backup/file_history/'
            if filename.find(his_path) != -1:
                return
            save_path = (his_path + filename).replace('//', '/')
            if not os.path.exists(save_path):
                os.makedirs(save_path, 384)

            his_list = sorted(os.listdir(save_path), reverse=True)
            num = public.readFile('data/history_num.pl')
            if not num:
                num = 100
            else:
                num = int(num)
            d_num = len(his_list)
            is_write = True
            new_file_md5 = public.FileMd5(filename)
            for i in range(d_num):
                rm_file = save_path + '/' + his_list[i]
                if i == 0:  # 判断是否和上一份副本相同
                    old_file_md5 = public.FileMd5(rm_file)
                    if old_file_md5 == new_file_md5:
                        is_write = False

                if i + 1 >= num:  # 删除多余的副本
                    if os.path.exists(rm_file):
                        os.remove(rm_file)
                    continue
            # 写入新的副本
            if is_write:
                public.writeFile(
                    save_path + '/' + str(int(time.time())), public.readFile(filename, 'rb'), 'wb')
        except:
            pass

    # 取历史副本
    def get_history(self, filename):
        try:
            save_path = ('/www/backup/file_history/' +
                         filename).replace('//', '/')
            if not os.path.exists(save_path):
                return []
            return sorted(os.listdir(save_path), reverse=True)
        except:
            return []

    # 删除指定副本
    def del_history(self, args):
        if not hasattr(args, "filename"):
            return public.returnMsg(False, "缺少参数filename")

        if not hasattr(args, "history"):
            return public.returnMsg(False, "缺少参数history")

        if not os.path.exists(args.filename):
            return public.returnMsg(False, '文件不存在!')
        save_path = ('/www/backup/file_history/' +
                     args.filename).replace('//', '/')
        path = save_path + '/' + args.history
        try:
            os.remove(path)
        except PermissionError as e:
            if e.errno == 13:
                return public.ReturnMsg(False, "没有足够的权限操作文件或目录!")
        return public.returnMsg(True, "历史版本【{}】删除成功".format(args.history))

    # 递归删除指定副本内容
    def del_history_recursive(self, args):
        if not hasattr(args, "filename"):
            return public.returnMsg(False, "缺少参数filename")

        if not hasattr(args, "history"):
            return public.returnMsg(False, "缺少参数history")

        if not os.path.exists(args.filename):
            return public.returnMsg(False, '文件不存在!')
            
        import json
        history_list = args.history
        if isinstance(history_list, str):
            try:
                history_list = json.loads(history_list)
            except:
                if ',' in history_list:
                    history_list = history_list.split(',')
                else:
                    history_list = [history_list]
        if not isinstance(history_list, list):
            history_list = [history_list]

        save_path = ('/www/backup/file_history/' +
                     args.filename).replace('//', '/')
                     
        success_count = 0

        for history in history_list:
            args.history = str(history)
            path = save_path + '/' + args.history

            if os.path.exists(path):
                if os.path.isdir(path):
                    old_history = args.history
                    for item in os.listdir(path):
                        args.history = old_history + '/' + item
                        res = self.del_history_recursive(args)
                        if isinstance(res, dict) and not res.get('status'):
                            args.history = old_history
                            return res
                    args.history = old_history
                    try:
                        os.rmdir(path)
                        success_count += 1
                    except PermissionError as e:
                        if e.errno == 13:
                            return public.ReturnMsg(False, "没有足够的权限操作文件或目录!")
                else:
                    res = self.del_history(args)
                    if isinstance(res, dict) and not res.get('status'):
                        return res
                    success_count += 1

        if len(history_list) == 1:
            return public.returnMsg(True, "历史版本【{}】删除成功".format(history_list[0]))
        else:
            return public.returnMsg(True, "成功批量删除 {} 个历史版本".format(success_count))

    # 读取指定历史副本
    def read_history(self, args):
        if not hasattr(args, "filename"):
            return public.returnMsg(False, "缺少参数filename")

        if not hasattr(args, "history"):
            return public.returnMsg(False, "缺少参数history")

        if not os.path.exists(args.filename):
            return public.returnMsg(False, '文件不存在!')
        save_path = ('/www/backup/file_history/' +
                     args.filename).replace('//', '/')
        args.path = save_path + '/' + args.history
        return self.GetFileBody(args)

    # 恢复指定历史副本
    def re_history(self, args):
        save_path = ('/www/backup/file_history/' +
                     args.filename).replace('//', '/')
        args.path = save_path + '/' + args.history
        if not os.path.exists(args.path):
            return public.returnMsg(False, '指定历史副本不存在!')
        import shutil
        if not os.path.exists(args.filename):
            return public.ReturnMsg(False, "指定文件不存在！")
        try:
            shutil.copyfile(args.path, args.filename)
        except PermissionError as e:
            if e.errno == 13:
                return public.ReturnMsg(False, "没有足够的权限操作文件或目录!")
        except:
            return public.ReturnMsg(False, "恢复历史副本失败！")
        return self.GetFileBody(args)

    # 自动保存配置
    def auto_save_temp(self, args):
        save_path = '/www/backup/file_auto_save/'
        if not os.path.exists(save_path):
            os.makedirs(save_path, 384)
        filename = save_path + args.filename
        if os.path.exists(filename):
            f_md5 = public.FileMd5(filename)
            s_md5 = public.md5(args.body)
            if f_md5 == s_md5:
                return public.returnMsg(True, '未修改!')
        public.writeFile(filename, args.body)
        return public.returnMsg(True, '自动保存成功!')

    # 取上一次自动保存的结果
    def get_auto_save_body(self, args):
        save_path = '/www/backup/file_auto_save/'
        args.path = save_path + args.filename
        return self.GetFileBody(args)

    # 取自动保存结果
    def get_auto_save(self, filename):
        try:
            save_path = ('/www/backup/file_auto_save/' +
                         filename).replace('//', '/')
            if not os.path.exists(save_path):
                return None
            return os.stat(save_path).st_mtime
        except:
            return None

    def is_max_size(self, path, max_size, max_num=10000, total_size=0, total_num=0):
        '''
            @name 是否超过最大大小
            @path 文件路径
            @max_size 最大大小
            @max_num 最大文件数量
            @return bool
        '''
        if not os.path.exists(path) or not max_size:
            return False, total_size, total_num
        total_size = public.get_dir_used(path)
        if total_size > max_size:
            return True, total_size, total_num
        total_num = 1
        if os.path.isdir(path):
            res = public.ExecShell('find {} -type f | wc -l '.format(path))[0]
            try:
                total_num = int(res)
            except:
                total_num = 9999999
        if total_num > max_num:
            return True, total_size, total_num
        return False, total_size, total_num
    
    # 文件压缩
    def Zip(self, get):
        if not 'z_type' in get:
            get.z_type = 'rar'

        if get.z_type == 'rar':
            if os.uname().machine != 'x86_64':
                return public.returnMsg(False, 'RAR组件只支持x86_64平台')
        import panelTask
        task_obj = panelTask.bt_task()
        max_size = 1024 * 1024 * 500
        max_num = 20000
        total_size = 0
        total_num = 0
        status = True
        if not os.path.exists(os.path.dirname(get.dfile)):
            os.makedirs(os.path.dirname(get.dfile))
        for file_name in get.sfile.split(','):
            path = os.path.join(get.path, file_name)
            status, total_size, total_num = self.is_max_size(path, max_size, max_num, total_size, total_num)
            if not status: break
        # get.volume_size="100KB"
        volume_size = get.get('volume_size', None)  # 从get中获取volume_size，如果不存在则为None
        save_path = get.get('save_path', None)
        # 如果被压缩目标小于500MB或文件数量少于2W个，则直接在主线程压缩
        if not status:
            return task_obj._zip(get.path, get.sfile, get.dfile, '/tmp/zip.log', get.z_type, volume_size, save_path)
        
        public.run_thread(task_obj.create_task,
                          ('压缩文件', 3, get.path, json.dumps({"sfile": get.sfile, "dfile": get.dfile, "z_type": get.z_type, "volume_size": volume_size, "save_path": save_path})))
        public.WriteLog("TYPE_FILE", 'ZIP_SUCCESS', (get.sfile, get.dfile))
        return public.returnMsg(True, '已将压缩任务添加到消息队列!')

    # 文件压缩并下载
    def ZipAndDownload(self, get):
        volume_size = get.get('volume_size', None)  # 从get中获取volume_size，如果不存在则为None
        save_path = get.get('save_path', None)
        
        import panelTask
        task_obj = panelTask.bt_task()
        status = True
        if not os.path.exists(os.path.dirname(get.dfile)):
            os.makedirs(os.path.dirname(get.dfile))
        for file_name in get.sfile.split(','):
            path = os.path.join(get.path, file_name)
            status, total_size, total_num = self.is_max_size(path, 1024 * 1024 * 500, 20000, 0, 0)
            if not status: break
        if status:
            task_id = task_obj.create_task('压缩文件', 3, get.path, json.dumps(
                {"sfile": get.sfile, "dfile": get.dfile, "z_type": get.z_type, "volume_size": volume_size, "save_path": save_path}))
            public.WriteLog("TYPE_FILE", 'ZIP_SUCCESS', (get.sfile, get.dfile))
            return {"status": True, "msg": "文件过大，已将压缩任务添加到消息队列!", "task_id": task_id}

        # 调用Zip函数进行压缩
        zip_result = task_obj._zip(get.path, get.sfile, get.dfile, '/tmp/zip.log', get.z_type, volume_size, save_path)
        if not zip_result['status']:  # 如果压缩失败，直接返回结果
            return zip_result
        port = str(public.get_panel_port())
        # 压缩成功，继续执行下载相关的操作
        # host = public.GetLocalIp()  # 获取服务器地址
        host = request.host.split(":")[0]
        ssl = "https" if public.is_ssl() else "http"
        server_url = '{}://{}:{}/'.format(ssl, host, port)

        file_path = get.dfile.replace('/', '%2F')
        download_url = f"{server_url}download?filename={file_path}"

        # 检查文件是否存在
        if os.path.exists(get.dfile):
            return public.returnMsg(True, download_url)
        else:
            return public.returnMsg(False, '指定压缩格式不支持!')
        
    def get_task_status(self, task_id):
        data = public.M("task_list").where("id=?", ('{}'.format(task_id), )).field("name,type,status,shell,other").select()
        return data[0]
    
    def get_zip_status(self, ws_get):
        task_id = ws_get.task_id

        status = True
        while status:
            try:
                data = self.get_task_status(task_id)
                get = json.loads(data["other"])
                if data["status"] == -1:
                    status = True
                    return_ = {"status": data["status"], "msg": "正在压缩"}
                elif data["status"] == 1:
                    status = False
                    port = str(public.get_panel_port())
                    # 压缩成功，继续执行下载相关的操作
                    host = public.GetLocalIp()  # 获取服务器地址        
                    ssl = "https" if public.is_ssl() else "http"
                    server_url = '{}://{}:{}/'.format(ssl, host, port)

                    file_path = get["dfile"].replace('/', '%2F')
                    download_url = "{}download?filename={}".format(server_url, file_path)
                    return_ = {"status": data["status"], "msg": download_url}
                else:
                    status = False
                    return_ = {"status": 99, "msg": "压缩失败"}
            except:
                status = False
                return_ = {"status": 99, "msg": "参数错误"}
            ws_get._ws.send(return_)
        return True

    # 文件被拆成多个小片段上传或下载后，再通过这个函数合并回原始文件
    def merge_split_file(self, get):
        import glob, os, json, public

        def check_merge_path(path):
            if not path or not isinstance(path, str):
                return False
            if any(ord(i) < 32 for i in path):
                return False
            if not os.path.isabs(path):
                return False
            if not public.path_safe_check(path):
                return False
            return True

        # 获取JSON文件路径并尝试读取
        json_file_path = get.get('json_file_path', '')
        if os.path.islink(json_file_path):
            return public.returnMsg(False, "JSON文件路径不合法")
        json_file_path = os.path.realpath(json_file_path)
        if not check_merge_path(json_file_path) or not json_file_path.endswith(".json"):
            return public.returnMsg(False, "JSON文件路径不合法")
        if not os.path.isfile(json_file_path):
            return public.returnMsg(False, "JSON文件不存在")

        try:
            with open(json_file_path, 'r') as json_file:
                json_content = json.load(json_file)
            split_file_path = json_content.get("split_file_path", "")
            if os.path.islink(split_file_path):
                return public.returnMsg(False, "分卷压缩文件路径不合法")
            split_file_path = os.path.realpath(split_file_path)
        except Exception as e:
            return public.returnMsg(False, "读取JSON文件失败: {}".format(str(e)))

        if not split_file_path:
            return public.returnMsg(False, "未找到分卷压缩文件路径")
        if not check_merge_path(split_file_path):
            return public.returnMsg(False, "分卷压缩文件路径不合法")

        # 确定合并后的文件路径
        if split_file_path.endswith("_split_"):
            merged_file_path = split_file_path.replace("_split_", ".zip")
        else:
            merged_file_path = split_file_path.rstrip('0123456789')
            if merged_file_path[-1] == '.':
                merged_file_path = merged_file_path[:-1]
        if os.path.islink(merged_file_path):
            return public.returnMsg(False, "合并文件路径不能是软链接")
        merged_file_path = os.path.realpath(merged_file_path)
        if not check_merge_path(merged_file_path):
            return public.returnMsg(False, "合并文件路径不合法")
        if not os.path.isdir(os.path.dirname(merged_file_path)):
            return public.returnMsg(False, "合并文件目录不存在")
        if os.path.isdir(merged_file_path):
            return public.returnMsg(False, "合并文件路径不能是目录")

        try:
            split_file_list = sorted(glob.glob(split_file_path + "*"))
            split_file_list = [i for i in split_file_list if os.path.realpath(i) != merged_file_path]
            if not split_file_list:
                return public.returnMsg(False, "未找到分卷文件")

            with open(merged_file_path, "wb") as merged_file:
                for split_file in split_file_list:
                    if os.path.islink(split_file):
                        return public.returnMsg(False, "分卷文件不能是软链接")
                    split_file = os.path.realpath(split_file)
                    if not check_merge_path(split_file):
                        return public.returnMsg(False, "分卷文件路径不合法")
                    if not os.path.isfile(split_file):
                        continue
                    with open(split_file, "rb") as f:
                        while True:
                            body = f.read(1024 * 1024)
                            if not body:
                                break
                            merged_file.write(body)
            return public.returnMsg(True, "分卷文件合并成功")
        except Exception as e:
            return public.returnMsg(False, "分卷文件合并失败: {}".format(str(e)))

    # 文件解压
    def UnZip(self, get):
        if get.sfile[-4:] == '.rar':
            if os.uname().machine != 'x86_64':
                return public.returnMsg(False, 'RAR组件只支持x86_64平台')
        if hasattr(get, "power"):
            power = str(get.power)
        else:
            power = None
        if hasattr(get, "user"):
            user = str(get.user)
        else:
            user = None
        import panelTask
        if not 'password' in get:
            get.password = ''
        if not os.path.exists(get.sfile):
            return public.returnMsg(False, '指定压缩包不存在!')
        if not os.path.exists(get.dfile):
            os.makedirs(get.dfile)

        import PluginLoader
        args = public.dict_obj()
        args.client_ip = public.GetClientIp()
        args.fun = "check_dir_safe"
        args.s = "check_dir_safe"
        args.file_data = {
            "base_path": os.path.dirname(get.sfile),
            "dirs": [get.dfile],
            "files": [os.path.basename(get.sfile)]
        }
        tamper_data = PluginLoader.plugin_run("tamper_core", "check_dir_safe", args)
        this_status = tamper_data.get("this", [])
        dirs_status = tamper_data.get("dirs", [])
        files_status = tamper_data.get("files", [])
        if len(this_status) != 0 or len(dirs_status) != 0 or len(files_status) != 0:
            if (str(this_status[0]).startswith("1") or str(dirs_status[0]).startswith("1") or str(files_status[0]).startswith("1")) and self._check_tamper_white() is False:
                return public.returnMsg(False, "该文件/或解压目录已开启防篡改！无法解压！")

        # # # 判断压缩包格式
        # if get.sfile.endswith('.zip'):
        #     return self.__unzip(get)

        # # elif get.sfile.endswith('.rar'):
        # #     try:
        # #         from unrar import rarfile
        # #     except:
        # #         os.system('btpip install unrar')
        # #         from unrar import rarfile
        # #     with rarfile.RarFile(get.sfile) as zip_ref:
        # #         preview_content = zip_ref.namelist()
        # elif get.sfile.endswith('.tar.gz'):
        #     return self.__untargz(get)

        zip_size = os.path.getsize(get.sfile)
        task_obj = panelTask.bt_task()
        if zip_size < 1024 * 1024 * 500:
            return task_obj._unzip(get.sfile, get.dfile, get.password, "/tmp/unzip.log", power, user)

        # task_obj.create_task('解压文件', 2, get.sfile, json.dumps(
        #     {"dfile": get.dfile, "password": get.password, "power": power}))
        public.run_thread(task_obj.create_task,
                            ('解压文件', 2, get.sfile, json.dumps({"dfile": get.dfile, "password": get.password, "power": power, "user": user})))
        public.WriteLog("TYPE_FILE", 'UNZIP_SUCCESS', (get.sfile, get.dfile))
        return public.returnMsg(True, '已将解压任务添加到消息队列!')

    @classmethod
    def __unzip(cls, get):
        filenames = getattr(get, "filenames", "[]")
        power = getattr(get, "power", "755")
        try:
            filenames = json.loads(filenames)
        except:
            filenames = []
        tmp_path = '{}/tmp/{}'.format(public.get_panel_path(), public.md5(public.GetRandomString(32)))
        if not os.path.exists(tmp_path):
            os.makedirs(tmp_path, 384)

        exists_list = []
        import zipfile
        try:
            with zipfile.ZipFile(get.sfile, 'r') as zip_file:
                for item in zip_file.infolist():
                    filename = item.filename
                    try:
                        filename = item.filename.encode('cp437').decode('gbk')
                    except:
                        pass
                    if item.filename != filename:
                        item.filename = filename

                    unzip_path = None
                    if len(filenames) != 0:  # 解压指定文件
                        for unzip_item in filenames:
                            if isinstance(unzip_item, dict):
                                # file_name = unzip_item["zip_file_path"]
                                unzip_path = unzip_item["file_path"]
                                break
                        else:
                            continue

                    if unzip_path is None:
                        unzip_path = os.path.join(get.dfile, filename)
                    temp_unzip_path = os.path.join(tmp_path, filename)
                    if os.path.exists(unzip_path):  # 存在重名文件
                        if item.is_dir(): continue
                        if not hasattr(get, "type1"):
                            exists_file = {
                                # 文件信息
                                "name": os.path.basename(unzip_path),
                                "file_path": unzip_path,
                                "file_size": os.path.getsize(unzip_path),
                                "file_mtime": datetime.datetime.fromtimestamp(os.path.getmtime(unzip_path)).strftime("%Y-%m-%d %H:%M:%S"),
                                # 压缩包内信息
                                "zip_file_path": filename,
                                "zip_file_size": item.file_size,
                                "zip_file_mtime": datetime.datetime(*item.date_time).strftime("%Y-%m-%d %H:%M:%S"),
                                "power": power,
                            }
                            exists_list.append(exists_file)
                            continue

                        if str(getattr(get, "type1", "0")) == "1":  # 覆盖
                            zip_file.extract(item, tmp_path, pwd=getattr(get, "password", "").encode())
                            # shutil.move(temp_path, unzip_path)
                        elif str(getattr(get, "type1", "0")) == "2":  # 重命名源文件
                            zip_file.extract(item, tmp_path, pwd=getattr(get, "password", "").encode())
                            base_name = os.path.basename(unzip_path)
                            dir_name = os.path.dirname(unzip_path)

                            idx = 1
                            name, ext = os.path.splitext(base_name)
                            new_name = name + "({})".format(idx) + ext
                            unzip_path = os.path.join(dir_name, new_name)
                            idx += 1
                            while os.path.exists(unzip_path):
                                new_name = name + "({})".format(idx) + ext
                                unzip_path = os.path.join(dir_name, new_name)
                                idx += 1
                            if os.path.exists(temp_unzip_path):
                                new_temp_unzip_path = os.path.join(os.path.dirname(temp_unzip_path), new_name)
                                os.rename(temp_unzip_path, new_temp_unzip_path)
                                temp_unzip_path = new_temp_unzip_path
                        else:  # 跳过
                            continue
                    else:
                        zip_file.extract(item, tmp_path, pwd=getattr(get, "password", "").encode())

                    dir_name = os.path.dirname(unzip_path)
                    if not os.path.exists(dir_name):
                        os.makedirs(dir_name)

                    if not os.path.exists(unzip_path):
                        shutil.move(temp_unzip_path, unzip_path)
                    else:
                        unique_id = time.time()
                        new_path = "{}_{}".format(unzip_path, unique_id)
                        while os.path.exists(new_path):
                            unique_id += "_1"
                        shutil.move(temp_unzip_path, new_path)

                    if power is not None:
                        public.ExecShell("chmod -R {} '{}'".format(power, unzip_path))
                if len(exists_list) != 0:
                    return {"status": True, "msg": "文件已存在是否覆盖?", "data": exists_list, "type": 1}
        except zipfile.BadZipfile:
            return public.returnMsg(False, "请解压 zip 压缩文件！")
        except RuntimeError as err:
            if str(err).find("is encrypted"):
                return public.returnMsg(False, '解压密码错误！')
            else:
                return public.returnMsg(False, '解压失败,error:' + public.get_error_info())
        finally:
            shutil.rmtree(tmp_path, True)
        return public.returnMsg(True, '文件解压成功')

    @classmethod
    def __untargz(cls, get):
        filenames = getattr(get, "filenames", "[]")
        power = getattr(get, "power", "755")
        try:
            filenames = json.loads(filenames)
        except:
            filenames = []

        import tarfile
        if not tarfile.is_tarfile(get.sfile):
            if get.sfile[-3:] == ".gz":
                return public.returnMsg(False, '这不是tar.gz压缩包文件, gz压缩包文件不支持预览,仅支持解压')
            return public.returnMsg(False, '不是有效的tar.gz压缩包文件')

        tmp_path = '{}/tmp/{}'.format(public.get_panel_path(), public.md5(public.GetRandomString(32)))
        if not os.path.exists(tmp_path):
            os.makedirs(tmp_path, 384)

        exists_list = []
        try:
            with tarfile.open(get.sfile) as zip_file:
                for item in zip_file.getmembers():
                    filename = item.name
                    try:
                        filename = item.name.encode('cp437').decode('gbk')
                    except:
                        pass
                    if item.name != filename:
                        item.name = filename

                    unzip_path = None
                    if len(filenames) != 0:  # 解压指定文件
                        for unzip_item in filenames:
                            if isinstance(unzip_item, dict):
                                # file_name = unzip_item["zip_file_path"]
                                unzip_path = unzip_item["file_path"]
                                if filename == unzip_item["zip_file_path"]:
                                    break
                        else:
                            continue

                    if unzip_path is None:
                        unzip_path = os.path.join(get.dfile, filename)
                    temp_unzip_path = os.path.join(tmp_path, filename)
                    if os.path.exists(unzip_path):  # 存在重名文件
                        if item.isdir(): continue
                        if not hasattr(get, "type1"):
                            exists_file = {
                                # 文件信息
                                "name": os.path.basename(unzip_path),
                                "file_path": unzip_path,
                                "file_size": os.path.getsize(unzip_path),
                                "file_mtime": datetime.datetime.fromtimestamp(os.path.getmtime(unzip_path)).strftime("%Y-%m-%d %H:%M:%S"),
                                # 压缩包内信息
                                "zip_file_path": filename,
                                "zip_file_size": item.size,
                                "zip_file_mtime": datetime.datetime.fromtimestamp(item.mtime).strftime("%Y-%m-%d %H:%M:%S"),
                                "power": power,
                            }
                            exists_list.append(exists_file)
                            continue

                        if str(getattr(get, "type1", "0")) == "1":  # 覆盖
                            zip_file.extract(item, tmp_path)
                        elif str(getattr(get, "type1", "0")) == "2":  # 重命名源文件
                            zip_file.extract(item, tmp_path)
                            base_name = os.path.basename(unzip_path)
                            dir_name = os.path.dirname(unzip_path)

                            idx = 1
                            name, ext = os.path.splitext(base_name)
                            new_name = name + "({})".format(idx) + ext
                            unzip_path = os.path.join(dir_name, new_name)
                            idx += 1
                            if os.path.exists(unzip_path):
                                new_name = name + "({})".format(idx) + ext
                                unzip_path = os.path.join(dir_name, new_name)
                                idx += 1
                            if os.path.exists(temp_unzip_path):
                                new_temp_unzip_path = os.path.join(os.path.dirname(temp_unzip_path), new_name)
                                os.rename(temp_unzip_path, new_temp_unzip_path)
                                temp_unzip_path = new_temp_unzip_path
                        else:  # 跳过
                            continue
                    else:
                        zip_file.extract(item, tmp_path)

                    dir_name = os.path.dirname(unzip_path)
                    if not os.path.exists(dir_name):
                        os.makedirs(dir_name)

                    try:
                        shutil.move(temp_unzip_path, unzip_path)
                    except PermissionError:
                        return public.returnMsg(False, '文件解压失败,权限不足')

                    if power is not None:
                        public.ExecShell("chmod -R {} '{}'".format(power, unzip_path))
                if len(exists_list) != 0:
                    return {"status": True, "msg": "文件已存在是否覆盖?", "data": exists_list, "type": 1}
        except RuntimeError as err:
            return public.returnMsg(False, '解压失败,error:' + public.get_error_info())
        finally:
            shutil.rmtree(tmp_path, True)
        return public.returnMsg(True, '文件解压成功')

    # 获取文件/目录 权限信息
    def GetFileAccess(self, get):
        if sys.version_info[0] == 2:
            get.filename = get.filename.encode('utf-8')
        data = {}
        try:
            import pwd
            stat = os.stat(get.filename)
            data['chmod'] = str(oct(stat.st_mode)[-3:])
            data['chown'] = pwd.getpwuid(stat.st_uid).pw_name
        except:
            data['chmod'] = 755
            data['chown'] = 'www'
        # 常用用户

        commonly_users = {"root", "www", "mysql", "redis", "bt-monitor"}
        # 获取服务器所有用户
        import pwd
        users = {user.pw_name for user in pwd.getpwall()}
        data['users'] = list(commonly_users & users) + list(users - commonly_users)
        return data

    # 设置文件权限和所有者
    def SetFileAccess(self, get, all='-R'):
        if sys.version_info[0] == 2:
            get.filename = get.filename.encode('utf-8')
        if 'all' in get:
            if get.all == 'False':
                all = ''
        try:
            if not self.CheckDir(get.filename):
                return public.returnMsg(False, 'FILE_DANGER')
            if not os.path.exists(get.filename):
                return public.returnMsg(False, 'FILE_NOT_EXISTS')
            public.ExecShell('chmod ' + all + ' ' + get.access + " '" + get.filename + "'")
            public.ExecShell('chown ' + all + ' ' + get.user + ':' +
                             get.user + " '" + get.filename + "'")
            public.WriteLog('TYPE_FILE', 'FILE_ACCESS_SUCCESS',
                            (get.filename, get.access, get.user))
            return public.returnMsg(True, 'SET_SUCCESS')
        except:
            return public.returnMsg(False, 'SET_ERROR')

    def SetFileAccept(self, filename):
        public.ExecShell('chown -R www:www ' + filename)
        public.ExecShell('chmod -R 755 ' + filename)

    # 取目录大小

    def GetDirSize(self, get):
        if not hasattr(get, "path"):
            return public.returnMsg(False, "缺少参数! path")
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        return public.to_size(public.get_path_size(get.path))

    # 取目录大小2
    def get_path_size(self, get):
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        data = {}
        data['path'] = get.path

        from panelController import Controller
        controller_obj = Controller()
        if os.path.exists(get.path):
            size = public.get_path_size(get.path)
        else:
            size = 0
        data['size'] = size
        return data

    def CloseLogs(self, get):
        get.path = public.GetConfigValue('root_path')
        public.ExecShell('rm -f ' + public.GetConfigValue('logs_path') + '/*')
        public.ExecShell('rm -rf ' + public.GetConfigValue('logs_path') + '/history_backups/*')
        public.ExecShell('rm -rf ' + public.GetConfigValue('logs_path') + '/request/*')
        public.ExecShell('rm -f ' + public.GetConfigValue('logs_path') + '/pm2/*.log')
        if public.get_webserver() == 'nginx':
            public.ExecShell(
                'kill -USR1 `cat ' + public.GetConfigValue('setup_path') + '/nginx/logs/nginx.pid`')
        else:
            public.ExecShell('/etc/init.d/httpd reload')

        public.WriteLog('TYPE_FILE', 'SITE_LOG_CLOSE')
        get.path = public.GetConfigValue('logs_path')
        return self.GetDirSize(get)

    # 批量操作
    def SetBatchData(self, get):
        from BTPanel import session
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if get.type == '1' or get.type == '2':
            session['selected'] = get
            return public.returnMsg(True, 'FILE_ALL_TIPS')
        elif get.type == '3':
            for key in json.loads(get.data):
                key = html.unescape(key)
                try:
                    if sys.version_info[0] == 2:
                        key = key.encode('utf-8')
                    filename = get.path + '/' + key
                    if not self.CheckDir(filename):
                        return public.returnMsg(False, 'FILE_DANGER')
                    ret = ' -R '
                    if 'all' in get:
                        if get.all == 'False':
                            ret = ''
                    public.ExecShell('chmod ' + ret + get.access + " '" + filename + "'")
                    public.ExecShell('chown ' + ret + get.user +
                                     ':' + get.user + " '" + filename + "'")
                except:
                    continue
            public.WriteLog('TYPE_FILE', 'FILE_ALL_ACCESS')
            return public.returnMsg(True, 'FILE_ALL_ACCESS')
        else:
            isRecyle = os.path.exists('data/recycle_bin.pl') and session.get('debug') != 1
            path = get.path
            get.data = json.loads(get.data)
            l = len(get.data)
            i = 0
            args = public.dict_obj()
            for key in get.data:
                key = html.unescape(key)
                try:
                    if sys.version_info[0] == 2:
                        key = key.encode('utf-8')
                    filename = path + '/' + key
                    get.path = filename
                    if not os.path.exists(filename):
                        # 软连接目标文件丢失会检测不到
                        os.remove(filename)
                        continue
                    i += 1
                    public.writeSpeed(key, i, l)
                    if os.path.isdir(filename):
                        if not self.CheckDir(filename):
                            return public.returnMsg(False, 'FILE_DANGER')
                        public.ExecShell("chattr -R -i " + filename)
                        if isRecyle:
                            self.Mv_Recycle_bin(get)
                        elif os.path.islink(filename):
                            os.remove(filename)
                        else:
                            shutil.rmtree(filename)
                    elif os.path.islink(filename):
                        public.ExecShell('chattr -i ' + filename)
                        if isRecyle:
                            self.Mv_Recycle_bin(get)
                        else:
                            os.remove(filename)
                    else:
                        if key == '.user.ini':
                            if l > 1:
                                continue
                            public.ExecShell('chattr -i ' + filename)
                        if isRecyle:

                            self.Mv_Recycle_bin(get)
                        else:
                            os.remove(filename)
                    args.path = filename
                    self.remove_file_ps(args)
                except Exception as e:
                    print(e)
                    continue
                public.writeSpeed(None, 0, 0)
            self.site_path_safe(get)
            if not isRecyle:
                public.WriteLog('TYPE_FILE', 'FILE_ALL_DEL')
                return public.returnMsg(True, 'FILE_ALL_DEL')
            else:
                public.WriteLog('TYPE_FILE', '已批量将{}个文件或目录移动到回收站'.format(i))
                return public.returnMsg(True, '已批量将{}个文件或目录移动到回收站'.format(i))

    # 批量粘贴
    def BatchPaste(self, get):
        from BTPanel import session
        import shutil
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
            if "skip_files" in get and bool(get.skip_files):
                get.skip_files = get.skip_files.encode('utf-8')

        if not self.CheckDir(get.path):
            return public.returnMsg(False, 'FILE_DANGER')
        if not 'selected' in session:
            return public.returnMsg(False, '操作失败,请重新操作复制或剪切过程')
        i = 0
        if not 'selected' in session:
            return public.returnMsg(False, '操作失败,请重新操作')
        myfiles = json.loads(session['selected']['data'])
        l = len(myfiles)

        # 跳过功能
        skip_files = []
        if "skip_files" in get and bool(get.skip_files.strip()):
            skip_files = get.skip_files
            if skip_files[0] == "[":
                skip_files = json.loads(skip_files)
            if isinstance(skip_files, str):
                skip_files = [skip_files, ]
        # 移除跳过的文件
        for f in skip_files:
            if f in myfiles and os.path.exists(get.path + "/" + f):
                myfiles.remove(f)
            else:
                return public.returnMsg(False, '跳过操作选择的文件{}不正确，{}文件并没有被选中'.format(f, f))

        if get.type == '1':

            ts = 0
            tn = 0
            sfile_list = []
            for key in myfiles:
                key = html.unescape(key)
                if sys.version_info[0] == 2:
                    sfile = session['selected']['path'] + \
                            '/' + key.encode('utf-8')
                    dfile = get.path + '/' + key.encode('utf-8')
                else:
                    sfile = session['selected']['path'] + '/' + key
                    dfile = get.path + '/' + key

                if os.path.commonpath([dfile, sfile]) == sfile:
                    return public.returnMsg(False,
                                            '错误的复制逻辑，从{}复制到{}有包含关系，存在无限循环复制风险!'.format(sfile,
                                                                                                                 dfile))
                status, total_size, total_num = self.is_max_size(sfile, 1024 * 1024 * 500, 20000)
                ts += total_size
                tn += total_num
                sfile_list.append(sfile)
            if ts > 1024*1024*5 or tn > 20000:
                import panelTask
                task_obj = panelTask.bt_task()
                public.run_thread(task_obj.create_task,
                                  ('复制文件', 8, " ".join(sfile_list), json.dumps(
                                      {"sfile": " ".join(sfile_list), "dfile": get.path})))
                return public.returnMsg(True, '已将复制文件任务添加到消息队列!')

            for key in myfiles:
                key = html.unescape(key)
                try:
                    if sys.version_info[0] == 2:
                        sfile = session['selected']['path'] + \
                                '/' + key.encode('utf-8')
                        dfile = get.path + '/' + key.encode('utf-8')
                    else:
                        sfile = session['selected']['path'] + '/' + key
                        dfile = get.path + '/' + key

                    if os.path.isdir(sfile):
                        self.copytree(sfile, dfile)
                    else:
                        shutil.copyfile(sfile, dfile)
                    stat = os.stat(sfile)
                    os.chown(dfile, stat.st_uid, stat.st_gid)
                except:
                    continue
                i += 1
                public.writeSpeed(key, i, l)
            public.WriteLog('TYPE_FILE', 'FILE_ALL_COPY',
                            (session['selected']['path'], get.path))
        else:
            checker = self._check_tamper_proof_file(session['selected']['path'], get.path + '/')
            for key in myfiles:
                key = html.unescape(key)
                try:
                    if sys.version_info[0] == 2:
                        sfile = session['selected']['path'] + \
                                '/' + key.encode('utf-8')
                        dfile = get.path + '/' + key.encode('utf-8')
                    else:
                        sfile = session['selected']['path'] + '/' + key
                        dfile = get.path + '/' + key
                    self.move(sfile, dfile, checker)
                except:
                    continue
                i += 1
                public.writeSpeed(key, i, l)
            self.site_path_safe(get)
            public.WriteLog('TYPE_FILE', 'FILE_ALL_MOTE',
                            (session['selected']['path'], get.path))
        public.writeSpeed(None, 0, 0)
        errorCount = len(myfiles) - i
        del (session['selected'])
        return public.returnMsg(True, 'FILE_ALL', (str(i), str(errorCount)))

    # 移动和重命名
    def move(self, sfile, dfile, file_checker=None):
        sfile = sfile.replace('//', '/')
        dfile = dfile.replace('//', '/')
        if sfile == dfile:
            return False
        if not os.path.exists(sfile):
            return False
        is_dir = os.path.isdir(sfile)
        if not os.path.exists(dfile) or not is_dir:
            if file_checker and file_checker.do_check(dfile): raise Exception()
            if os.path.exists(dfile):
                os.remove(dfile)
            shutil.move(sfile, dfile)
        else:
            self.copytree(sfile, dfile, file_checker)
            if os.path.exists(sfile) and os.path.exists(dfile):
                if is_dir and not (file_checker and file_checker.flag):
                    shutil.rmtree(sfile)
                else:
                    os.remove(sfile)
        return True

    # 复制目录
    def copytree(self, sfile, dfile, file_checker=None):
        if sfile == dfile:
            return False
        if not os.path.exists(dfile):
            os.makedirs(dfile)
        for f_name in os.listdir(sfile):
            if not f_name.strip(): continue
            if f_name.find('./') != -1: continue
            src_filename = (sfile + '/' + f_name).replace('//', '/')
            dst_filename = (dfile + '/' + f_name).replace('//', '/')
            mode_info = public.get_mode_and_user(src_filename)
            if os.path.isdir(src_filename):
                if not os.path.exists(dst_filename):
                    os.makedirs(dst_filename)
                    public.set_mode(dst_filename, mode_info['mode'])
                    public.set_own(dst_filename, mode_info['user'])
                self.copytree(src_filename, dst_filename)
            else:
                try:
                    if file_checker and file_checker.do_check(dst_filename): raise Exception
                    shutil.copy2(src_filename, dst_filename)
                    public.set_mode(dst_filename, mode_info['mode'])
                    public.set_own(dst_filename, mode_info['user'])
                except:
                    pass
        return True

    # 下载文件

    def DownloadFile(self, get):
        import panelTask
        task_obj = panelTask.bt_task()
        get.filename = public.xsssec2(get.filename)
        task_obj.create_task('下载文件', 1, get.url, get.path + '/' + get.filename)
        # if sys.version_info[0] == 2: get.path = get.path.encode('utf-8')
        # import db,time
        # isTask = '/tmp/panelTask.pl'
        # execstr = get.url +'|bt|'+get.path+'/'+get.filename
        # sql = db.Sql()
        # public.M('tasks').add('name,type,status,addtime,execstr',('下载文件['+get.filename+']','download','0',time.strftime('%Y-%m-%d %H:%M:%S'),execstr))
        # public.writeFile(isTask,'True')
        # self.SetFileAccept(get.path+'/'+get.filename)
        public.WriteLog('TYPE_FILE', 'FILE_DOWNLOAD', (get.url, get.path))
        return public.returnMsg(True, 'FILE_DOANLOAD')

    # 添加安装任务
    def InstallSoft(self, get):
        from BTPanel import session
        import db
        import time
        path = public.GetConfigValue('setup_path') + '/php'
        if not os.path.exists(path):
            public.ExecShell("mkdir -p " + path)
        if session['server_os']['x'] != 'RHEL':
            get.type = '3'
        apacheVersion = 'false'
        if public.get_webserver() == 'apache':
            apacheVersion = public.readFile(
                public.GetConfigValue('setup_path') + '/apache/version.pl')
        public.writeFile('/var/bt_apacheVersion.pl', apacheVersion)
        public.writeFile('/var/bt_setupPath.conf',
                         public.GetConfigValue('root_path'))
        isTask = '/tmp/panelTask.pl'
        execstr = "cd " + public.GetConfigValue('setup_path') + "/panel/install && /bin/bash install_soft.sh " + \
                  get.type + " install " + get.name + " " + get.version
        if public.get_webserver() == "openlitespeed":
            execstr = "cd " + public.GetConfigValue('setup_path') + "/panel/install && /bin/bash install_soft.sh " + \
                      get.type + " install " + get.name + "-ols " + get.version
        sql = db.Sql()
        if hasattr(get, 'id'):
            id = get.id
        else:
            id = None

        self.check_install_lib(get.type)
        task_id = public.M('tasks').add(
            'id,name,type,status,addtime,execstr', (None, '安装[' + get.name + '-' + get.version + ']',
                                                    'execshell', '0', time.strftime('%Y-%m-%d %H:%M:%S'), execstr))

        msg = self.create_install_wait_msg(task_id, get.name + '-' + get.version, is_update=False)
        public.writeFile(isTask, 'True')
        self.sync_php_config(get.version)
        public.WriteLog('TYPE_SETUP', 'PLUGIN_ADD', (get.name, get.version))
        time.sleep(0.1)
        res = public.returnMsg(True, 'PLUGIN_ADD')
        res["msg_id"] = None if msg is None else msg.id
        return res

    def sync_php_config(self, php_version):
        '''
            @name php两个配置文件同步
            @author dazahung<2023-8-11>
            @param php_config_path<string> 配置文件文件路径
        '''
        php_config_path = public.get_setup_path() + '/php/' + php_version + '/etc/'
        execstr = "cat " + php_config_path + "php.ini > " + php_config_path + "php-cli.ini"
        res = public.ExecShell(execstr)
        return

    # 删除任务队列
    def RemoveTask(self, get):
        try:
            name = public.M('tasks').where('id=?', (get.id,)).getField('name')
            status = public.M('tasks').where(
                'id=?', (get.id,)).getField('status')
            public.M('tasks').delete(get.id)
            if status == '-1':
                public.ExecShell(
                    "kill `ps -ef |grep 'python panelSafe.pyc'|grep -v grep|grep -v panelExec|awk '{print $2}'`")
                public.ExecShell(
                    "kill `ps -ef |grep 'install_soft.sh'|grep -v grep|grep -v panelExec|awk '{print $2}'`")
                public.ExecShell(
                    "kill `ps aux | grep 'python task.pyc$'|awk '{print $2}'`")
                public.ExecShell('''
pids=`ps aux | grep 'sh'|grep -v grep|grep install|awk '{print $2}'`
arr=($pids)

for p in ${arr[@]}
do
    kill -9 $p
done
            ''')

                public.ExecShell(
                    'rm -f ' + name.replace('扫描目录[', '').replace(']', '') + '/scan.pl')
                isTask = '/tmp/panelTask.pl'
                public.writeFile(isTask, 'True')
                public.ExecShell('/etc/init.d/bt start')
            else:
                self.change_msg_data(get.id)
        except:
            public.ExecShell('/etc/init.d/bt start')
        return public.returnMsg(True, 'PLUGIN_DEL')

    # 记录取消的安装信息
    @staticmethod
    def change_msg_data(task_id):
        from panel_msg import Message

        msg_list = Message.find_by_sub_args(
            sub_name="soft_install",
            sub_where=("soft_install.task_id=?", (task_id,)),
            limit=1)
        if msg_list is not None:
            msg = msg_list[0]
            msg.sub["install_status"] = msg.sub["install_status"][2:] + "的任务已手动取消"
            msg.sub["status"] = 3
            msg.read = False
            msg.title = msg.title[2:] + "已取消"
            msg.read_time = 0
            msg.save_to_db()

    # 重新激活任务
    def ActionTask(self, get):
        isTask = '/tmp/panelTask.pl'
        public.writeFile(isTask, 'True')
        return public.returnMsg(True, 'PLUGIN_ACTION')

    # 卸载软件
    def UninstallSoft(self, get):
        from BTPanel import session
        public.writeFile('/var/bt_setupPath.conf',
                         public.GetConfigValue('root_path'))
        get.type = '0'
        if session['server_os']['x'] != 'RHEL':
            get.type = '3'
        if public.get_webserver() == "openlitespeed":
            default_ext = ["bz2", "calendar", "sysvmsg", "exif", "imap", "readline", "sysvshm", "xsl"]
            if get.version == "73":
                default_ext.append("opcache")
            if not os.path.exists("/etc/redhat-release"):
                default_ext.append("gmp")
                default_ext.append("opcache")
            if get.name.lower() in default_ext:
                return public.returnMsg(False, "这是OpenLiteSpeed的默认扩展不可以卸载")
        execstr = "cd " + public.GetConfigValue('setup_path') + "/panel/install && /bin/bash install_soft.sh " + \
                  get.type + " uninstall " + get.name.lower() + " " + get.version.replace('.', '')
        if public.get_webserver() == "openlitespeed":
            execstr = "cd " + public.GetConfigValue('setup_path') + "/panel/install && /bin/bash install_soft.sh " + \
                      get.type + " uninstall " + get.name.lower() + "-ols " + get.version.replace('.', '')
        public.ExecShell(execstr)
        self.sync_php_config(get.version)
        public.WriteLog('TYPE_SETUP', 'PLUGIN_UNINSTALL',
                        (get.name, get.version))
        return public.returnMsg(True, "PLUGIN_UNINSTALL")

    # 取任务队列进度
    def GetTaskSpeed(self, get):
        tempFile = '/tmp/panelExec.log'
        # freshFile = '/tmp/panelFresh'
        import db
        find = db.Sql().table('tasks').where('status=? OR status=?',
                                             ('-1', '0')).field('id,type,name,execstr').find()
        if (type(find) == str):
            return public.returnMsg(False, "查询发生错误，" + find)
        if find is None or len(find) == 0:
            return public.returnMsg(False, '当前没有任务队列在执行-2!')
        isTask = '/tmp/panelTask.pl'
        public.writeFile(isTask, 'True')
        echoMsg = {}
        echoMsg['name'] = find['name']
        echoMsg['execstr'] = find['execstr']
        if find['type'] == 'download':
            try:
                tmp = public.readFile(tempFile)
                if len(tmp) < 10:
                    return public.returnMsg(False, '当前没有任务队列在执行-3!')
                echoMsg['msg'] = json.loads(tmp)
                echoMsg['isDownload'] = True
            except:
                db.Sql().table('tasks').where(
                    "id=?", (find['id'],)).save('status', ('0',))
                return public.returnMsg(False, '当前没有任务队列在执行-4!')
        else:
            echoMsg['msg'] = self.GetLastLine(tempFile, 20)
            echoMsg['isDownload'] = False

        echoMsg['task'] = public.M('tasks').where("status!=?", ('1',)).field(
            'id,status,name,type').order("id asc").select()
        return echoMsg

    # 取执行日志
    def GetExecLog(self, get):
        return self.GetLastLine('/tmp/panelExec.log', 100)

    # 读文件指定倒数行数
    def GetLastLine(self, inputfile, lineNum):
        result = public.GetNumLines(inputfile, lineNum)
        # if len(result) < 1:
        #     return public.getMsg('TASK_SLEEP')
        return result

    # 执行SHELL命令
    def ExecShell(self, get):
        disabled = ['vi', 'vim', 'top', 'passwd', 'su']
        get.shell = get.shell.strip()
        tmp = get.shell.split(' ')
        if tmp[0] in disabled:
            return public.returnMsg(False, 'FILE_SHELL_ERR', (tmp[0],))
        shellStr = '''#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
cd %s
%s
''' % (get.path, get.shell)
        public.writeFile('/tmp/panelShell.sh', shellStr)
        public.ExecShell(
            'nohup bash /tmp/panelShell.sh > /tmp/panelShell.pl 2>&1 &')
        return public.returnMsg(True, 'FILE_SHELL_EXEC')

    # 取SHELL执行结果
    def GetExecShellMsg(self, get):
        fileName = '/tmp/panelShell.pl'
        if not os.path.exists(fileName):
            return 'FILE_SHELL_EMPTY'
        status = not public.process_exists('bash', None, '/tmp/panelShell.sh')
        return public.returnMsg(status, public.GetNumLines(fileName, 200))

    # 文件搜索
    def GetSearch(self, get):
        if not os.path.exists(get.path):
            return public.returnMsg(False, 'DIR_NOT_EXISTS')
        #检查search 参数是否合法，防止命令注入 
        if re.search(r"[;&|#'\"`]", get.search):
            return public.returnMsg(False, '搜索关键词包含非法字符!')
        return public.ExecShell("find " + get.path + " -name '*" + get.search + "*'")

    # 保存草稿
    def SaveTmpFile(self, get):
        save_path = public.get_panel_path() + '/temp'
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        get.path = os.path.join(save_path, public.Md5(get.path) + '.tmp')
        public.writeFile(get.path, get.body)
        return public.returnMsg(True, '已保存')

    # 获取草稿
    def GetTmpFile(self, get):
        self.CleanOldTmpFile()
        save_path = public.get_panel_path() + '/temp'
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        src_path = get.path
        get.path = os.path.join(save_path, public.Md5(get.path) + '.tmp')
        if not os.path.exists(get.path):
            return public.returnMsg(False, '没有可用的草稿!')
        data = self.GetFileInfo(get.path)
        data['file'] = src_path
        if 'rebody' in get:
            data['body'] = public.readFile(get.path)
        return data

    # 清除过期草稿
    def CleanOldTmpFile(self):
        from BTPanel import session
        if 'clean_tmp_file' in session:
            return True
        save_path = public.get_panel_path() + '/temp'
        max_time = 86400 * 30
        now_time = time.time()
        for tmpFile in os.listdir(save_path):
            filename = os.path.join(save_path, tmpFile)
            fileInfo = self.GetFileInfo(filename)
            if now_time - fileInfo['modify_time'] > max_time:
                os.remove(filename)
        session['clean_tmp_file'] = True
        return True

    # 取指定文件信息
    def GetFileInfo(self, path):
        if not os.path.exists(path):
            return False
        stat = os.stat(path)
        fileInfo = {}
        fileInfo['modify_time'] = int(stat.st_mtime)
        fileInfo['size'] = os.path.getsize(path)
        return fileInfo

    # 安装rar组件
    def install_rar(self, get):
        unrar_file = public.get_setup_path() + '/rar/unrar'
        rar_file = public.get_setup_path() + '/rar/rar'
        bin_unrar = '/usr/local/bin/unrar'
        bin_rar = '/usr/local/bin/rar'
        if os.path.exists(unrar_file) and os.path.exists(bin_unrar):
            try:
                import rarfile
            except:
                public.ExecShell("pip install rarfile")
            return True

        import platform
        os_bit = ''
        if platform.machine() == 'x86_64':
            os_bit = '-x64'
        download_url = public.get_url() + '/src/rarlinux' + os_bit + '-5.6.1.tar.gz'

        tmp_file = '/tmp/bt_rar.tar.gz'
        public.ExecShell('wget -O ' + tmp_file + ' ' + download_url)
        if os.path.exists(unrar_file):
            public.ExecShell("rm -rf {}".format(rar_file))
        public.ExecShell("tar xvf " + tmp_file + ' -C {}'.format(public.get_setup_path()))
        if os.path.exists(tmp_file):
            os.remove(tmp_file)
        if not os.path.exists(unrar_file):
            return False

        if os.path.exists(bin_unrar):
            os.remove(bin_unrar)
        if os.path.exists(bin_rar):
            os.remove(bin_rar)

        public.ExecShell('ln -sf ' + unrar_file + ' ' + bin_unrar)
        public.ExecShell('ln -sf ' + rar_file + ' ' + bin_rar)
        public.ExecShell("pip install rarfile")
        # public.writeFile('data/restart.pl','True')
        return True

    def get_store_data(self):
        data = []
        path = 'data/file_store.json'
        try:
            if os.path.exists(path):
                data = json.loads(public.readFile(path))
        except:
            data = []
        if type(data) == dict:
            result = []
            for key in data:
                for path in data[key]:
                    result.append(path)
            self.set_store_data(result)
            return result
        return data

    def set_store_data(self, data):
        public.writeFile('data/file_store.json', json.dumps(data))
        return True

    # 获取收藏夹
    def get_files_store(self, get):
        data = self.get_store_data()
        result = []
        for path in data:
            if type(path) == dict:
                path = path['path']
            info = {'path': path, 'name': os.path.basename(path)}
            if os.path.isdir(path):
                info['type'] = 'dir'
            else:
                info['type'] = 'file'
            result.append(info)
        return result

    # 添加收藏夹
    def add_files_store(self, get):
        path = get.path
        if not os.path.exists(path):
            return public.returnMsg(False, '文件或目录不存在!')
        data = self.get_store_data()
        if path in data:
            return public.returnMsg(False, '请勿重复添加!')
        data.append(path)
        self.set_store_data(data)
        return public.returnMsg(True, '添加成功!')

    # 删除收藏夹
    def del_files_store(self, get):
        path = get.path
        data = self.get_store_data()
        if not path in data:
            is_go = False
            for info in data:
                if type(info) == dict:
                    if info['path'] == path:
                        path = info
                        is_go = True
                        break
            if not is_go:
                return public.returnMsg(False, '找不到此收藏对象!')

        data.remove(path)
        if len(data) <= 0:
            data = []
        self.set_store_data(data)
        return public.returnMsg(True, '删除成功!')

    # ======================================================================
    # 应用打开方式（Open With）
    #
    # 功能：为文件管理中的各类文件扩展名关联默认打开程序，类似 Windows
    #       「打开方式」功能。前端在文件列表右键菜单中展示可选应用列表。
    #
    # 数据文件（双文件机制，解决升级覆盖问题）：
    #   data/app_open.default.json  — 面板内置预设（发版时更新，升级时会被覆盖）
    #                                   新增应用或格式时，修改此文件即可
    #   data/app_open.json          — 用户配置（升级时保留，不受更新影响）
    #                                   首次访问时自动从 default 创建，
    #                                   用户通过 set_app_open 修改的内容保存在此
    #
    # 结构说明（修改 data/app_open.default.json 即可扩展，无需改动代码）：
    #   apps:    应用注册表
    #            {app_id: {name: "显示名", cmd: "路由命令", icon: "图标名"}}
    #            例: {"monaco": {name: "Monaco Editor", cmd: "Monaco", icon: "code"}}
    #   formats: 格式注册表
    #            {ext: {name: "格式名", group: ["分类"], apps: ["兼容app_id"], app_id: "当前选中"}}
    #            例: {"txt": {name: "文本文件", group: ["code"], apps: ["editor","monaco"], app_id: "editor"}}
    #   group 字段用于前端分组筛选，apps 是兼容列表，app_id 是当前选中项（必须在 apps 中）。
    #
    # 路由注册：BTPanel/__init__.py 的 filesObject 白名单中
    # 接口：
    #   GET  /files?action=get_app_open&ext=txt  → 查询后缀的当前打开方式
    #   POST /files?action=set_app_open&ext=txt&app_id=monaco  → 修改打开方式
    #
    # 扩展指引：
    #   1. 新增应用 → data/app_open.default.json 的 apps 中添加条目
    #   2. 新增格式 → 同上 formats 中添加，apps 字段列出兼容的应用 ID
    #   3. 新增接口 → 在此区域添加方法，同时在 BTPanel/__init__.py 注册路由
    # ======================================================================

    __app_open_file = 'data/app_open.json'               # 用户配置，升级不受影响
    __app_open_default = 'data/app_open.default.json'    # 面板内置预设，发版时更新

    def __get_app_open_data(self):
        """
        读取用户配置
        存在直接读取，不存在则从预设 default 创建
        若读取结果异常（空数据/解析失败），自动从 default 恢复
        @return dict  {"apps": {...}, "formats": {...}}
        """
        data = None
        if os.path.exists(self.__app_open_file):
            try:
                data = json.loads(public.readFile(self.__app_open_file))
            except:
                pass

        # 用户配置有效 → 直接返回
        if data and isinstance(data, dict) and (data.get("apps") or data.get("formats")):
            return data

        # 用户配置无效/不存在 → 从默认模板初始化
        default_data = {"apps": {}, "formats": {}}
        if os.path.exists(self.__app_open_default):
            try:
                default_data = json.loads(public.readFile(self.__app_open_default))
            except:
                pass
        if default_data.get("apps") or default_data.get("formats"):
            self.__save_app_open_data(default_data)
        return default_data

    def __save_app_open_data(self, data):
        """
        持久化配置到 data/app_open.json（用户配置，升级时不受影响）
        @param data: dict  完整的 {"apps": ..., "formats": ...} 结构
        """
        public.writeFile(self.__app_open_file, json.dumps(data, ensure_ascii=False, indent=2))
        return True

    def get_app_open(self, get):
        """
        查询文件后缀的打开方式
        传 ext 查单个后缀，不传 ext 返回全部配置
        @param get.ext: str  文件后缀，如 "txt"（可选，不带点，大小写不敏感）
        @return dict
        """
        try:
            ext = str(getattr(get, 'ext', '')).strip().lower()
            data = self.__get_app_open_data()

            # 不传 ext → 返回全部配置
            if not ext:
                apps_list = []
                for app_id, info in data.get("apps", {}).items():
                    apps_list.append({
                        "id": app_id,
                        "name": info.get("name", app_id),
                        "cmd": info.get("cmd", ""),
                        "icon": info.get("icon", ""),
                        "count": sum(1 for fmt in data.get("formats", {}).values()
                                     if app_id in fmt.get("apps", [])),
                    })
                apps_list.sort(key=lambda x: x["name"])
                formats_list = []
                for ext_name, info in data.get("formats", {}).items():
                    app_info = data.get("apps", {}).get(info.get("app_id"), {})
                    formats_list.append({
                        "ext": ext_name,
                        "name": info.get("name", ext_name),
                        "group": info.get("group", []),
                        "icon": info.get("icon", ""),
                        "apps": info.get("apps", []),
                        "app_id": info.get("app_id"),
                        "app_name": app_info.get("name", info.get("app_id")),
                    })
                formats_list.sort(key=lambda x: x["ext"])
                return public.returnMsg(True, {"apps": apps_list, "formats": formats_list})

            # 传 ext → 查单个
            fmt = data.get("formats", {}).get(ext)
            if not fmt:
                return public.returnMsg(False, '不支持的文件格式')
            app_id = fmt.get("app_id")
            app_info = data.get("apps", {}).get(app_id, {})
            return public.returnMsg(True, {
                "ext": ext,
                "name": fmt.get("name", ext),
                "app_id": app_id,
                "app_name": app_info.get("name", ""),
                "cmd": app_info.get("cmd", ""),
                "icon": app_info.get("icon", ""),
                "apps": fmt.get("apps", []),
            })
        except:
            public.WriteLog('TYPE_FILE', '获取打开方式配置异常', ())
            return public.returnMsg(False, '获取打开方式配置失败')

    def set_app_open(self, get):
        """
        设置指定文件后缀的打开方式
        @param get.ext:     str  文件后缀，如 "txt"（不带点）
        @param get.app_id:  str  应用 ID（必须在 data/app_open.json 的 apps 中存在）
        @return dict  {"status": true/false, "msg": "..."}
        """
        try:
            ext = str(getattr(get, 'ext', '')).strip().lower()
            app_id = str(getattr(get, 'app_id', '')).strip()
            if not ext:
                return public.returnMsg(False, '请指定文件后缀')
            if not app_id:
                return public.returnMsg(False, '请指定打开方式')
            data = self.__get_app_open_data()
            if ext not in data.get("formats", {}):
                return public.returnMsg(False, '不支持的文件格式')
            if app_id not in data.get("apps", {}):
                return public.returnMsg(False, '不支持的打开方式')
            data["formats"][ext]["app_id"] = app_id
            self.__save_app_open_data(data)
            return public.returnMsg(True, '设置成功')
        except:
            public.WriteLog('TYPE_FILE', '设置打开方式配置异常', ())
            return public.returnMsg(False, '设置打开方式失败')

    # 单文件木马扫描
    def file_webshell_check(self, get):
        if not 'filename' in get: return public.returnMsg(True, '文件不存在!')
        import webshell_check
        if webshell_check.webshell_check().upload_file_url(get.filename.strip()):
            return public.returnMsg(False, '警告 %s文件为webshell' % get.filename.strip().split('/')[-1])
        else:
            return public.returnMsg(True, '无风险')

    # 目录扫描木马
    def dir_webshell_check(self, get):
        if not 'path' in get: return public.returnMsg(False, '请输入有效目录!')
        path = get.path.strip()
        if os.path.exists(path):
            # 启动消息队列
            exec_shell = public.get_python_bin() + ' /www/server/panel/class/webshell_check.py dir %s mail' % path
            task_name = "扫描目录%s 的木马文件" % path
            import panelTask
            task_obj = panelTask.bt_task()
            task_obj.create_task(task_name, 0, exec_shell)
            return public.returnMsg(True, '正在启动木马查杀进程。详细信息会在面板安全日志中')

    def get_dir(self, path):
        return_data = []
        data2 = []
        [[return_data.append(os.path.join(root, file)) for file in files] for root, dirs, files in os.walk(path)]
        for i in return_data:
            if str(i.lower())[-4:] == '.php':
                data2.append(i)
        return data2

    # 目录
    def getdir_list(self, path_data):
        if os.path.exists(str(path_data)):
            return self.get_dir(path_data)
        else:
            return False

    def ws_webshell_check(self, get):
        '''
            @name websocket 进行木马扫描
            @author <lkq-2022-4-27>
            @param path 需要扫描的目录
            @return 实时返回扫描的信息
        '''
        if not 'path' in get: return public.returnMsg(False, '请输入有效目录!')
        if not '_ws' in get: return public.returnMsg(False, '当前只支持websocket链接!')
        if '_ws' in get: get._ws.send(public.getJson(
            {
                "end": False, "ws_callback": get.ws_callback, "info": "正在开始查杀木马请稍等....", "type": "check",
                "status": False
            }))
        file = []
        if '_ws' in get: get._ws.send(public.getJson(
            {
                "end": False, "ws_callback": get.ws_callback,
                "info": "正在获取当前目录下的php文件,如目录过大可能需要1-2分钟,请稍等....", "type": "check",
                "status": False
            }))
        for root, dirs, files in os.walk(get.path):
            for filespath in files:
                file2 = os.path.join(root, filespath)
                if '.php' in filespath:
                    file.append(file2)
                    if len(file) > 20000:
                        if '_ws' in get: get._ws.send(public.getJson(
                            {
                                "end": True, "ws_callback": get.ws_callback,
                                "info": "当前目录下的php文件超过20000.建议扫描子目录...", "type": "check",
                                "status": False
                            }))
                        return []
        if '_ws' in get: get._ws.send(public.getJson(
            {
                "end": False, "ws_callback": get.ws_callback, "info": "获取当前目录下的php文件已完成,正在扫描....",
                "type": "check",
                "status": False
            }))
        import webshell_check
        webshell = webshell_check.webshell_check()
        if not file:
            if '_ws' in get: get._ws.send(public.getJson(
                {
                    "end": True, "ws_callback": get.ws_callback, "info": "当前文件夹不存在木马文件", "type": "check",
                    "status": False
                }))
            return []
        if '_ws' in get: get._ws.send(public.getJson(
            {
                "end": False, "ws_callback": get.ws_callback, "info": "获取php文件数量为【%s】" % str(len(file)),
                "type": "check",
                "status": False
            }))
        result = webshell.scan(file, [])  # rule参数无意义，暂时移除
        url = webshell.get_check_url()
        result_info = []
        count = 0
        if '_ws' in get: get._ws.send(public.getJson(
            {
                "end": False, "ws_callback": get.ws_callback,
                "info": "扫描完成异常文件,异常文件数量为【%s】" % str(len(result)), "type": "check",
                "status": False
            }))
        for i in result:
            count += 1
            if '_ws' in get: get._ws.send(public.getJson(
                {
                    "end": False, "ws_callback": get.ws_callback, "info": "%s" % i, "type": "check", "status": False,
                    "count": len(result), "is_count": count
                }))
            if webshell.upload_file_url2(i, url):
                result_info.append(i)
                if '_ws' in get: get._ws.send(public.getJson(
                    {
                        "end": False, "ws_callback": get.ws_callback, "info": "发现 %s 文件是为木马" % i, "type": "check",
                        "status": True, "path": i
                    }))
        if '_ws' in get: get._ws.send(public.getJson(
            {
                "end": True, "ws_callback": get.ws_callback, "info": "扫描已完成", "type": "check",
                "status": True
            }))
        return result_info

    # 提交误报
    def send_baota(self, get):
        '''
            @name 提交误报 进行木马扫描
            @author <lkq-2022-4-27>
            @param path 需要扫描的目录
            @return 实时返回扫描的信息
        '''
        try:
            userInfo = json.loads(public.ReadFile('/www/server/panel/data/userInfo.json'))
            cloudUrl = 'http://www.bt.cn/api/bt_waf/reportTrojanError'
            pdata = {
                'name': get.filename, 'inputfile': public.ReadFile(get.filename), "md5": public.Md5(get.filename),
                "access_key": userInfo['access_key'], "uid": userInfo['uid']
            }
            ret = public.httpPost(cloudUrl, pdata)
            return public.returnMsg(True, "提交误报完成")
        except:
            return public.returnMsg(True, "提交误报完成")

    def __is_permanent(self, expire):
        now = int(time.time())
        return expire >= now + (31 * 3600 * 24)

    # 获取下载地址列表
    def get_download_url_list(self, get):
        my_table = 'download_token'
        count = public.M(my_table).where('filename like ? or ps like ?', ('%' + get.filename + '%', '%' + get.filename + '%',)).count()

        if not 'p' in get:
            get.p = 1
        if not 'limit' in get:
            get.limit = 12
        if not 'collback' in get:
            get.collback = ''
        data = public.get_page(count, int(get.p), get.limit, get.collback)
        data['data'] = public.M(my_table).where('filename like ? or ps like ?', ('%'+get.filename+'%', '%'+get.filename+'%',)).order('id desc').field(
            'id,filename,token,expire,ps,total,password,addtime').limit(data['shift'] + ',' + data['row']).select()
        for i in data['data']:
            if isinstance(i["ps"], float):
                pass
            else:
                i["ps"] = i["ps"].strip().replace("ps:", "")

            if self.__is_permanent(i['expire']):
                i['expire'] = "永久有效"
            else:
                i['expire'] = public.format_date(times=i['expire'])

        return data

    # 获取短列表
    def get_download_list(self):
        if self.download_list != None: return self.download_list
        my_table = 'download_token'
        self.download_list = public.M(my_table).field('id,filename,expire').select()
        if self.download_token_list == None: self.download_token_list = {}
        m_time = time.time()
        for d in self.download_list:
            # 清理过期和无效
            if self.download_is_rm: continue
            if not os.path.exists(d['filename']) or m_time > d['expire']:
                public.M(my_table).where('id=?', (d['id'],)).delete()
                continue
            self.download_token_list[d['filename']] = d['id']

        # 标记清理
        if not self.download_is_rm:
            self.download_is_rm = True

    # 获取id
    def get_download_id(self, filename):
        self.get_download_list()
        return str(self.download_token_list.get(filename, '0'))

    # 获取指定下载地址
    def get_download_url_find(self, get):
        if not 'id' in get: return public.returnMsg(False, '错误的参数!')
        id = int(get.id)
        my_table = 'download_token'
        data = public.M(my_table).where('id=?', (id,)).find()
        if isinstance(data["ps"], float):
            pass
        else:
            data["ps"] = data["ps"].strip().replace("ps:", "")
        if not data: return public.returnMsg(False, '指定地址不存在!')
        data['is_file'] = os.path.isfile(data['filename'])
        if self.__is_permanent(data["expire"]):
            data["expire"] = "永久有效"
        else:
            data["expire"] = public.format_date(times=data["expire"])
        return data

    # 删除下载地址
    def remove_download_url(self, get):
        if not 'id' in get: return public.returnMsg(False, '错误的参数!')
        id = int(get.id)
        my_table = 'download_token'
        public.M(my_table).where('id=?', (id,)).delete()
        return public.returnMsg(True, '删除成功!')

    # 修改下载地址
    def modify_download_url(self, get):
        if not 'id' in get: return public.returnMsg(False, '错误的参数!')
        id = int(get.id)
        my_table = 'download_token'
        if not public.M(my_table).where('id=?', (id,)).count():
            return public.returnMsg(False, '指定地址不存在!')
        pdata = {}
        if 'expire' in get: pdata['expire'] = get.expire
        if 'password' in get:
            pdata['password'] = get.password
            if len(pdata['password']) < 4 and len(pdata['password']) > 0:
                return public.returnMsg(False, '提取密码长度不能小于4位')
            if not re.match(r'^\w+$', pdata['password']):
                return public.returnMsg(False, '提取密码中不能带有特殊符号')

        if 'ps' in get: pdata['ps'] = get.ps
        public.M(my_table).where('id=?', (id,)).update(pdata)
        return public.returnMsg(True, '修改成功!')

    # 生成下载地址
    def create_download_url(self, get):
        if not os.path.exists(get.filename):
            return public.returnMsg(False, '指定文件不存在!')
        my_table = 'download_token'
        mtime = int(time.time())
        pdata = {
            "filename": get.filename,  # 文件名
            "token": public.GetRandomString(12),  # 12位随机密钥，用于URL
            "expire": mtime + (int(get.expire) * 3600),  # 过期时间
            "ps": "ps:{}".format(get.ps),  # 备注
            "total": 0,  # 下载计数
            "password": str(get.password),  # 提取密码
            "addtime": mtime,  # 添加时间
        }

        exts = os.path.basename(get.filename).split('.')
        if len(exts) > 1:
            if str(get.filename).lower().endswith(".tar.gz"):
                pdata['token'] += ".tar.gz"
            else:
                pdata['token'] += "." + exts[-1]

        if len(pdata['password']) < 4 and len(pdata['password']) > 0:
            return public.returnMsg(False, '提取密码长度不能小于4位')

        if not re.match(r'^\w+$', pdata['password']) and pdata['password']:
            return public.returnMsg(False, '提取密码中不能带有特殊符号')
        # 更新 or 插入
        token = public.M(my_table).where('filename=?', (get.filename,)).getField('token')
        if token:
            return public.returnMsg(False, '已经分享过了!')
            # pdata['token'] = token
            # del(pdata['total'])
            # public.M(my_table).where('token=?',(token,)).update(pdata)
        else:
            id = public.M(my_table).insert(pdata)
            pdata['id'] = id
        # 添加关键数据统计
        public.set_module_logs('linux_down', 'create_download_url', 1)
        pdata["is_file"] = os.path.isfile(get.filename)
        pdata['expire'] = public.format_date(times=pdata['expire'])
        return public.returnMsg(True, pdata)

    # 取PHP-CLI执行命令
    def __get_php_bin(self, php_version=None):
        php_vs = public.get_php_versions(True)
        if php_version:
            if php_version != 'auto':
                if not php_version in php_vs: return ''
            else:
                php_version = None

        # 判段兼容的PHP版本是否安装
        php_path = "/www/server/php/"
        php_v = None
        for pv in php_vs:
            if php_version:
                if php_version != pv: continue
            php_bin = php_path + pv + "/bin/php"
            if os.path.exists(php_bin):
                php_v = pv
                break
        # 如果没安装直接返回False
        if not php_v: return ''
        # 处理PHP-CLI-INI配置文件
        php_ini = '/www/server/panel/tmp/composer_php_cli_' + php_v + '.ini'
        src_php_ini = php_path + php_v + '/etc/php.ini'
        import shutil
        shutil.copy(src_php_ini, php_ini)
        # 解除所有禁用函数
        php_ini_body = public.readFile(php_ini)
        php_ini_body = re.sub(r"disable_functions\s*=.*", "disable_functions = ", php_ini_body)
        public.writeFile(php_ini, php_ini_body)
        return php_path + php_v + '/bin/php -c ' + php_ini

    # 执行git
    def exec_git(self, get):
        #检查URL合法性
        if not re.match(r'^(https?|git|ssh|ftp|ftps)://[^\s/$.?#].[^\s]*$', get.giturl):
            return public.returnMsg(False, '请输入合法的Git仓库URL!') 
        if get.git_action == 'option':
            public.ExecShell("nohup {} &> /tmp/panelExec.pl &".format(get.giturl))
        else:
            public.ExecShell("nohup git clone {} &> /tmp/panelExec.pl &".format(get.giturl))
        return public.returnMsg(True, '命令已发送!')

    # 安装composer
    def get_composer_bin(self):
        composer_bin = '/usr/bin/composer'
        download_addr = 'wget -O {} {}/install/src/composer.phper -T 5'.format(composer_bin, public.get_url())
        if not os.path.exists(composer_bin):
            public.ExecShell(download_addr)
        elif os.path.getsize(composer_bin) < 100:
            public.ExecShell(download_addr)

        public.ExecShell('chmod +x {}'.format(composer_bin))
        if not os.path.exists(composer_bin):
            return False
        return composer_bin

    # 执行composer
    def exec_composer(self, get):
        site_name = get.get("siteName" ,"")
        log_file = '/tmp/composer.log'
        if site_name:
            log_file = '/tmp/composer_{}.log'.format(site_name)
        if hasattr(get, 'composer_version') and get.composer_version and get.composer_version in['2.7.3','1.10.27']:
            composer_bin = '/usr/bin/composer{}'.format(('_' + get.composer_version.replace('.', '_')) )
            if not os.path.exists(composer_bin):
                url = public.get_url() + '/src/compose/composer_{}'.format(get.composer_version.replace('.', '_'))
                public.ExecShell('wget -O {} {} &> {}'.format(composer_bin, url, log_file))
                if os.path.exists(composer_bin):
                    public.ExecShell('chmod +x {}'.format(composer_bin))
        else:
            # 准备执行环境
            composer_bin = self.get_composer_bin()
        if not composer_bin:
            return public.returnMsg(False, '没有找到可用的composer!')

        # 取执行PHP版本
        php_version = None
        if 'php_version' in get:
            php_version = get.php_version
        php_bin = self.__get_php_bin(php_version)
        if not php_bin:
            return public.returnMsg(False, '没有找到可用的PHP版本，或指定PHP版本未安装!')
        get.composer_cmd = get.composer_cmd.strip()
        if get.composer_cmd == '':
            if not os.path.exists(get.path + '/composer.json'):
                return public.returnMsg(False, '指定目录中没有找到composer.json配置文件!')

        
        user = ''
        del_cache = lambda: ()
        if 'user' in get:
            user = 'sudo -u {} '.format(get.user)
            if not os.path.exists('/usr/bin/sudo'):
                if os.path.exists('/usr/bin/apt'):
                    public.ExecShell('apt update > {}'.format(log_file))
                    public.ExecShell("apt install sudo -y > {}".format(log_file))
                else:
                    public.ExecShell("yum install sudo -y > {}".format(log_file))
            # public.ExecShell("mkdir -p /home/www && chown -R www:www /home/www")
            del_cache = self._composer_user_home()
        # 设置指定源
        if 'repo' in get:
            if get.repo != 'repos.packagist':
                public.ExecShell(
                    'export COMPOSER_HOME=/tmp && {}{} {} config -g repo.packagist composer {}'.format(user, php_bin,
                                                                                                       composer_bin,
                                                                                                       get.repo))
            else:
                public.ExecShell(
                    'export COMPOSER_HOME=/tmp && {}{} {} config -g --unset repos.packagist'.format(user, php_bin,
                                                                                                    composer_bin))
        # 执行composer命令
        if not get.composer_cmd:
            composer_exec_str = '{} {} {}'.format(php_bin, composer_bin, get.composer_args)
        else:
            if get.composer_cmd.find('composer ') == 0 or get.composer_cmd.find('/usr/bin/composer ') == 0:
                composer_cmd = get.composer_cmd.replace('composer ', '').replace('/usr/bin/composer ', '')
                composer_exec_str = '{} {} {}'.format(php_bin, composer_bin, composer_cmd)
            else:
                composer_exec_str = '{} {} {} {}'.format(php_bin, composer_bin, get.composer_args,
                                                              get.composer_cmd)

        if os.path.exists(log_file): os.remove(log_file)
        public.ExecShell(
            "cd {} && export COMPOSER_HOME=/tmp && {} nohup {} &> {} && echo 'BT-Exec-Completed' >> {} &".format(
                get.path, user, composer_exec_str, log_file, log_file))
        del_cache()
        public.WriteLog('Composer', "在目录：{}，执行composer {}".format(get.path, get.composer_args))
        return public.returnMsg(True, '命令已发送!')

    # 取composer版本
    def get_composer_version(self, get):
        composer_bin = self.get_composer_bin()
        if not composer_bin:
            return public.returnMsg(False, '没有找到可用的composer!')
        try:
            bs = str(public.readFile(composer_bin, 'rb'))
            result = re.findall(r"const VERSION\s*=\s*.{0,2}'([\d.]+)", bs)[0]
            if not result: raise Exception('empty!')
        except:
            php_bin = self.__get_php_bin()
            if not php_bin:  return public.returnMsg(False, '没有找到可用的PHP版本!')
            composer_exec_str = 'export COMPOSER_HOME=/tmp && ' + php_bin + ' ' + composer_bin + ' --version 2>/dev/null|grep \'Composer version\'|awk \'{print $3}\''
            result = public.ExecShell(composer_exec_str)[0].strip()

        data = public.returnMsg(True, result)
        if 'path' in get:
            import panelSite
            data['php_versions'] = panelSite.panelSite().GetPHPVersion(get)
            data['comp_json'] = True
            data['comp_lock'] = False
            if not os.path.exists(get.path + '/composer.json'):
                data['comp_json'] = '指定目录中没有找到composer.json配置文件!'
                data['file_path'] = ""
            else:
                data['file_path']=get.path+"/composer.json"
            # if os.path.exists(get.path + '/composer.lock'):
            #     data['comp_lock'] = '指定目录中存在composer.lock文件,请删除后再执行!'
        return data

    # 升级composer版本
    def update_composer(self, get):
        composer_bin = self.get_composer_bin()
        if not composer_bin:
            return public.returnMsg(False, '没有找到可用的composer!')
        php_bin = self.__get_php_bin()
        if not php_bin:  return public.returnMsg(False, '没有找到可用的PHP版本!')
        # 设置指定源
        # if 'repo' in get:
        #     if get.repo:
        #         public.ExecShell('{} {} config -g repo.packagist composer {}'.format(php_bin,composer_bin,get.repo))

        version1 = self.get_composer_version(get)['msg']
        composer_exec_str = 'export COMPOSER_HOME=/tmp && {} {} self-update -vvv'.format(php_bin, composer_bin)
        public.ExecShell(composer_exec_str)
        version2 = self.get_composer_version(get)['msg']
        if version1 == version2:
            msg = "当前已经是最新版本，无需升级!"
        else:
            msg = "升级composer从{}到{}".format(version1, version2)
            public.WriteLog('Composer', msg)
        return public.returnMsg(True, msg)

    # 计算文件HASH
    def get_file_hash(self, args=None, filename=None):
        if not filename: filename = args.filename
        import hashlib
        md5_obj = hashlib.md5()
        sha1_obj = hashlib.sha1()
        f = open(filename, 'rb')
        while True:
            b = f.read(8096)
            if not b:
                break
            md5_obj.update(b)
            sha1_obj.update(b)
        f.close()
        return {'md5': md5_obj.hexdigest(), 'sha1': sha1_obj.hexdigest()}

    # 取历史副本
    def get_history_info(self, filename):
        try:
            save_path = ('/www/backup/file_history/' +
                         filename).replace('//', '/')
            if not os.path.exists(save_path):
                return []
            result = []
            for f in sorted(os.listdir(save_path)):
                f_name = (save_path + '/' + f).replace('//', '/')
                pdata = {}
                pdata['md5'] = public.FileMd5(f_name)
                f_stat = os.stat(f_name)
                pdata['st_mtime'] = int(f)
                pdata['st_size'] = f_stat.st_size
                pdata['history_file'] = f_name
                result.insert(0, pdata)
            return sorted(result, key=lambda x: x['st_mtime'], reverse=True)
        except:
            return []

    # 获取文件扩展名
    def get_file_ext(self, filename):
        ss_exts = ['tar.gz', 'tar.bz2', 'tar.bz']
        for s in ss_exts:
            e_len = len(s)
            f_len = len(filename)
            if f_len < e_len: continue
            if filename[-e_len:] == s:
                return s
        if filename.find('.') == -1: return ''
        return filename.split('.')[-1]

    # 取所属用户或组
    def get_mode_user(self, uid):
        import pwd
        try:
            return pwd.getpwuid(uid).pw_name
        except:
            return uid

    # 取lsattr
    def get_lsattr(self, filename):
        if os.path.isfile(filename):
            return public.ExecShell('lsattr {}'.format(filename))[0].split(' ')[0]
        else:
            s_name = os.path.basename(filename)
            s_path = os.path.dirname(filename)

            try:
                res = public.ExecShell('lsattr {}'.format(s_path))[0].strip()
                for s in res.split('\n'):
                    if not s: continue
                    lsattr_info = s.split()
                    if not lsattr_info: continue
                    if filename == lsattr_info[1]:
                        return lsattr_info[0]
            except:
                raise public.PanelError(lsattr_info)

        return '--------------e----'

    def get_size_du_sh(self, path):
        import subprocess
        output = subprocess.check_output(['du', '-sh', path])
        size_str = output.decode('utf-8').split()[0]
        return size_str

    # 取指定文件属性
    def get_file_attribute(self, args):
        filename = args.filename.strip()
        if not os.path.exists(filename):
            return public.returnMsg(False, '指定文件不存在!')
        attribute = {}
        attribute['name'] = os.path.basename(filename)
        attribute['path'] = os.path.dirname(filename)
        f_stat = os.stat(filename)
        size = "dir" if os.path.isdir(filename) else f_stat.st_size
        attribute['st_atime'] = int(f_stat.st_atime)  # 最后访问时间
        attribute['st_mtime'] = int(f_stat.st_mtime)  # 最后修改时间
        attribute['st_ctime'] = int(f_stat.st_ctime)  # 元数据修改时间/权限或数据者变更时间
        attribute['st_size'] = size  # 文件大小(bytes)
        attribute['st_gid'] = f_stat.st_gid  # 用户组id
        attribute['st_uid'] = f_stat.st_uid  # 用户id
        attribute['st_nlink'] = f_stat.st_nlink  # inode 的链接数
        attribute['st_ino'] = f_stat.st_ino  # inode 的节点号
        attribute['st_mode'] = f_stat.st_mode  # inode 保护模式
        attribute['st_dev'] = f_stat.st_dev  # inode 驻留设备
        attribute['user'] = self.get_mode_user(f_stat.st_uid)  # 所属用户
        attribute['group'] = self.get_mode_user(f_stat.st_gid)  # 所属组
        attribute['mode'] = str(oct(f_stat.st_mode)[-3:])  # 文件权限号
        attribute['md5'] = '大于100M或目录不计算'  # 文件MD5
        attribute['sha1'] = '大于100M或目录不计算'  # 文件sha1
        attribute['lsattr'] = self.get_lsattr(filename)
        attribute['is_dir'] = os.path.isdir(filename)  # 是否为目录
        attribute['is_link'] = os.path.islink(filename)  # 是否为链接文件
        if attribute['is_link']:
            attribute['st_type'] = '链接文件'
        elif attribute['is_dir']:
            attribute['st_type'] = '文件夹'
        else:
            attribute['st_type'] = self.get_file_ext(filename)
        attribute['history'] = []
        if f_stat.st_size < 104857600 and not attribute['is_dir']:
            hash_info = self.get_file_hash(filename=filename) if not stat.S_ISSOCK(f_stat.st_mode) else {"md5": "", "sha1": ""}
            attribute['md5'] = hash_info['md5']
            attribute['sha1'] = hash_info['sha1']
            attribute['history'] = self.get_history_info(filename)  # 历史文件
        return attribute

    def files_search(self, args):
        import panelSearch
        public.set_module_logs('files', 'files_search')
        adad = panelSearch.panelSearch()
        return adad.get_search(args)

    def files_replace(self, args):
        import panelSearch
        adad = panelSearch.panelSearch()
        return adad.get_replace(args)

    def get_replace_logs(self, args):
        import panelSearch
        adad = panelSearch.panelSearch()
        return adad.get_replace_logs(args)

    def get_path_images(self, path):
        '''
            @name 获取目录的图片列表
            @param path 目录路径
            @return 图片列表
        '''
        image_list = []
        for fname in os.listdir(path):
            if fname.split('.')[-1] in ['png', 'jpeg', 'gif', 'jpg', 'bmp', 'ico']:
                image_list.append(fname)
        return ','.join(image_list)

    def clear_thumbnail(self):
        '''
            @name 清除过期的缩略图缓存
            @author hwliang
            @return void
        '''
        try:
            from BTPanel import cache
        except:
            return
        ikey = 'thumbnail_cache'
        if cache.get(ikey): return

        cache_path = '{}/cache/thumbnail'.format(public.get_panel_path())
        if not os.path.exists(cache_path): return
        expire_time = time.time() - (30 * 86400)  # 30天前的文件
        for fname in os.listdir(cache_path):
            filename = os.path.join(cache_path, fname)
            if os.path.getctime(filename) < expire_time:
                os.remove(filename)

        # 标记，每天清理一次
        cache.set(ikey, 1, 86400)

    def get_images_resize(self, args):
        '''
            @name 获取指定图片的缩略图
            @author hwliang<2022-03-02>
            @param args<dict_obj>{
                "path": "", 图片路径
                "files": xx.png,aaa.jpg, 文件名称(不包含目录路径),如果files=*，则返回该目录下的所有图片
                "width": 50, 宽
                "heigth:50, 高
                "return_type": "base64" // base64,file
            }
            @return base64编码的图片 or file
        '''
        try:
            from PIL import Image
        except:
            public.ExecShell("btpip install Pillow")
            from PIL import Image
        from base64 import b64encode
        from io import BytesIO
        if args.files == '*':
            args.files = self.get_path_images(args.path)

        file_list = args.files.split(',')

        width = int(args.width)
        height = int(args.height)

        cache_path = '{}/cache/thumbnail'.format(public.get_panel_path())
        if not os.path.exists(cache_path): os.makedirs(cache_path, 384)
        data = {}
        _max_time = 3  # 最大处理时间
        _stime = time.time()

        # 清理过期的缩略图缓存
        self.clear_thumbnail()

        for fname in file_list:
            try:
                filename = os.path.join(args.path, fname)
                f_size = os.path.getsize(filename)
                cache_file = os.path.join(cache_path, public.md5("{}_{}_{}_{}".format(filename, width, height, f_size)))
                if not os.path.exists(filename):
                    # 移除缓存文件
                    if os.path.exists(cache_file): os.remove(cache_file)
                    continue

                # 有缩略图缓存的使用缓存
                if os.path.exists(cache_file):
                    data[fname] = public.readFile(cache_file)
                    continue

                # 超出最大处理时间直接跳过后续图片的处理，以免影响前端用户体验
                if time.time() - _stime > _max_time:
                    data[fname] = ''
                    continue

                im = Image.open(filename)
                im.thumbnail((width, height))
                out = BytesIO()
                im.save(out, im.format)
                out.seek(0)
                image_type = im.format.lower()
                mimetype = 'image/{}'.format(image_type)
                if args.return_type == 'base64':
                    b64_data = "data:{};base64,".format(mimetype) + b64encode(out.read()).decode('utf-8')
                    data[fname] = b64_data
                    out.close()
                    # 写缩略图缓存
                    public.writeFile(cache_file, b64_data)
                else:
                    from flask import send_file
                    return send_file(out, mimetype=mimetype, cache_timeout=0)
            except:
                data[fname] = ''

        return public.return_data(True, data)

    def set_rsync_data(self, data):
        '''
            @name 写入rsync配置数据
            @author cjx
            @param data<dict> 配置数据
            @return bool
        '''
        public.writeFile('{}/data/file_rsync.json'.format(public.get_panel_path()), json.dumps(data))
        return True

    def get_rsync_data(self):
        '''
            @name 获取文件同步配置
            @author cjx
            @return dict
        '''
        data = {}
        path = '{}/data/file_rsync.json'.format(public.get_panel_path())
        try:
            if os.path.exists(path):
                data = json.loads(public.readFile(path))
        except:
            data = {}
        return data

    def add_files_rsync(self, get):
        '''
            @name 添加数据同步标记
            @author cjx
        '''
        path = get.path
        s_type = get.s_type

        data = self.get_rsync_data()
        if not path in data: data[path] = {}

        data[path][s_type] = 1

        self.set_rsync_data(data)
        return public.returnMsg(True, '添加成功!')

    # ———————————————————
    #  融合企业级防篡改  |
    # ———————————————————

    # 防篡改：获取文件是否在保护列表中
    def _check_tamper(self, data):
        try:
            import PluginLoader
        except:
            return {}
        args = public.dict_obj()
        args.client_ip = public.GetClientIp()
        args.fun = "check_dir_safe"
        args.s = "check_dir_safe"
        args.file_data = {
            "base_path": data['PATH'],
            "dirs": [i.split(";", 1)[0] for i in data["DIR"]],
            "files": [i.split(";", 1)[0] for i in data["FILES"]]
        }
        data["tamper_data"] = PluginLoader.plugin_run("tamper_core", "check_dir_safe", args)

        return data

    # 用于GetDir 防篡改：获取文件是否在保护列表中
    def _new_check_tamper(self, data):
        try:
            import PluginLoader
        except:
            return {}
        args = public.dict_obj()
        args.client_ip = public.GetClientIp()
        args.fun = "check_dir_safe"
        args.s = "check_dir_safe"
        args.file_data = {
            "base_path": data["path"],
            "dirs": [i["sn"] for i in data["dir"]],
            "files": [i["sn"] for i in data["files"]]
        }
        tamper_data = PluginLoader.plugin_run("tamper_core", "check_dir_safe", args)
        return tamper_data

    # 防篡改：检查进程白名单，是否允许面板编辑
    def _check_tamper_white(self) -> bool:
        tamper = "/www/server/tamper/tamper.conf"
        if not os.path.isfile(tamper):
            return False
        try:
            tamper_info = json.loads(public.readFile(tamper))
        except:
            return False
        if "BT-Panel" in tamper_info["process_names"]:
            return True
        return False

    def _check_tamper_proof_file(self, sfile, dfile):
        """因网站范篡改，检查能否建立文件
        @author baozi <202-03-16>
        @param:
            dfile  ( str ):  移动或重命名后会出现的目标文件名
        @return  bool : 是否被保护，不可以移动或重命名
        """

        def do_check(self, dfile):
            def _protect_EXT(pathname, _conf):
                if pathname.find('.') == -1: return False
                extName = pathname.split('.')[-1].lower()
                if pathname in _conf['protectExt']:
                    return True
                if extName in _conf['protectExt']:
                    return True
                return False

            def _exclude_PATH_OF_SITE(pathname, _conf):
                pathname = pathname.lower()
                dirNames = pathname.split('/')
                if _conf["excludePath"]:
                    if pathname in _conf["excludePath"]:
                        return True
                    if pathname + '/' in _conf["excludePath"]:
                        return True
                    for ePath in _conf["excludePath"]:
                        if ePath in dirNames: return True
                        if pathname.find(ePath) == 0: return True
                return False

            _conf = self._get_conf(dfile)
            if not _conf: return False
            if _exclude_PATH_OF_SITE(dfile, _conf):
                return False
            if not os.path.isdir(dfile):
                if not _protect_EXT(dfile, _conf):
                    return False

            self.flag = True
            return True

        def _get_conf(self, dfile):
            for i in self.conf:
                if i["open"] and dfile.startswith(i["path"] + "/"):
                    return i
            return None

        checker = type("checker", (object,), {"do_check": do_check, "_get_conf": _get_conf})()
        conf_path = public.get_panel_path() + '/plugin/tamper_proof/sites.json'
        if not os.path.exists(conf_path): return False
        try:
            checker.conf = json.loads(public.readFile(conf_path))
        except:
            checker.conf = []

        return checker

    @staticmethod
    def _composer_user_home() -> Callable:
        import pwd
        res = pwd.getpwnam('www')
        uid = res.pw_uid
        gid = res.pw_gid
        if not os.path.exists("/home/www"):
            del_all = True
            os.makedirs("/home/www")
        else:
            del_all = False

        os.chown("/home/www", uid, gid)

        if del_all:
            return lambda: shutil.rmtree("/home/www/.cache", ignore_errors=True)
        return lambda: ()

    # 检查是否开启防篡改
    def CheckTamper(self, get):
        try:
            if not hasattr(get, "path"):
                return public.returnMsg(False, "缺少参数! path")
            path = get.path

            if not os.path.exists(path):
                return public.returnMsg(False, "路径不存在！")

            file_type = 0
            if os.path.islink(path):
                file_type = 3
            elif os.path.isfile(path):
                file_type = 1
            elif os.path.isdir(path):
                file_type = 2

            data = {
                "PATH": os.path.dirname(path),
                "DIR": [],
                "FILES": [],
            }
            if file_type == 1:
                data["FILES"].append(os.path.basename(path))
            elif file_type == 2:
                data["DIR"].append(os.path.basename(path))

            resp = self._check_tamper(data)

            tamper_data = resp.get("tamper_data", {})

            tamper_status = "0"
            if file_type == 1:
                tamper_status = tamper_data.get("files", [])[0]
            elif file_type == 2:
                tamper_status = tamper_data.get("dirs", [])[0]
            is_tamper = str(tamper_status).startswith("1")
            return {"status": True, "msg": "ok", "data": is_tamper}
        except Exception as err:
            pass

    # 获取文件操作历史记录
    def GetFileHistory(self, get):
        filter_sql = ""
        params = ()
        if "content" in get:
            filter_sql = "and(addtime like ? or log like ?)"
            params=('%'+get.content+'%', '%'+get.content+'%')
        count = public.M("logs").where("type='文件管理' {}".format(filter_sql), params).count()
        if not 'p' in get:
            get.p = 1
        if not 'limit' in get:
            get.limit = 20
        if not 'collback' in get:
            get.collback = ''
        data = public.get_page(count, int(get.p), get.limit, get.collback)
        file_log = public.M("logs").where("type='文件管理' {}".format(filter_sql), params).order("id desc").limit(data['shift']+','+data['row']).select()

        data.update({
            "data": file_log,
            "status": True,
            "msg": "ok",
        })

        public.set_module_logs("file", "GetFileHistory", 1)
        return data

    # 切割文件
    @classmethod
    def split_file(cls,
                   file_path: str,  # 文件路径
                   split_size: int = None,  # 切割大小 MB
                   split_num: int = None,  # 切割数量
                   split_file_name: str = None,  # 切割文件名，默认为切割目标文件名
                   split_file_ext: str = None,  # 切割文件后缀
                   save_path: str = None,  # 切割后保存的路径
                   ) -> Tuple[bool, Union[str, dict]]:
        import math
        if not os.path.isfile(file_path):
            return False, "文件不存在！"

        totoal_size = os.path.getsize(file_path)
        split_file_option = ""
        totoal_split_size = math.ceil(totoal_size / 1024 / 1024)
        if split_size:  # 默认使用大小
            split_file_option = "--bytes={}M".format(split_size)
            split_num = math.ceil(totoal_split_size / split_size)
        elif split_num:  # 按照数量拆分
            split_file_option = "--number={}".format(split_num)
            split_size = round(totoal_split_size / split_num)
        else:  # 默认按照大小拆分 100M
            split_size = 100
            split_file_option = "--bytes={}M".format(split_size)
            split_num = math.ceil(totoal_split_size / split_size)

        if split_num < 2:
            return False, "文件拆分数量最小为 2个 !"

        file_name = os.path.basename(file_path)

        if not save_path:  # 保存路径
            save_path = os.path.dirname(file_path)

        save_dir_name = "{file_name}_split".format(file_name=file_name)
        save_dir = os.path.join(save_path, save_dir_name)
        i = 1
        while os.path.isdir(save_dir):
            save_dir_name = "{file_name}_split-({ectype})".format(file_name=file_name, ectype=i)
            save_dir = os.path.join(save_path, save_dir_name)
            i += 1

        os.makedirs(save_dir)

        if not split_file_name:  # 切割文件名，默认为切割目标文件名
            file_ext_temp = file_name.split(".")
            if len(file_ext_temp) != 0:
                split_file_name = "{file_name}_sqlit_".format(file_name=".".join(file_ext_temp[:-1]))
            else:
                split_file_name = "{file_name}_sqlit_".format(file_name=file_name)

        if not split_file_ext:
            split_file_ext = ".bt_split"
        split_file_shell = "--additional-suffix={split_file_ext}".format(split_file_ext=split_file_ext)

        shell = "cd '{save_dir}' && split {split_file_option} --numeric-suffixes=1 --suffix-length={split_length} {split_file_shell} '{file_path}' {split_file_name}".format(
            save_dir=save_dir,
            split_file_option=split_file_option,
            split_length=len(str(split_num)),
            file_path=file_path,
            split_file_name=split_file_name,
            split_file_shell=split_file_shell,
        )
        public.ExecShell(shell)

        split_file_list = []
        for name in os.listdir(save_dir):
            path = os.path.join(save_dir, name)
            if not os.path.isfile(path):
                continue
            split_file_list.append(name)

        split_config_info = {
            "name": file_name,
            "size": totoal_size,
            "split_size": split_size,
            "split_num": split_num,
            "md5": public.FileMd5(file_path),
            "split_file": split_file_list,
            "save_dir": save_dir,
        }
        split_config_path = os.path.join(save_dir, "split_config.bt_split_json")
        public.writeFile(split_config_path, json.dumps(split_config_info))

        public.ExecShell("chattr +i -R {split_dir}".format(split_dir=save_dir))
        return True, split_config_info

    # 切割文件
    @classmethod
    def split_file_new(cls,
                       file_path: str,  # 文件路径
                       split_size: int = None,  # 切割大小 MB
                       split_num: int = None,  # 切割数量
                       split_file_name: str = None,  # 切割文件名，默认为切割目标文件名
                       split_file_ext: str = None,  # 切割文件后缀
                       save_path: str = None,  # 切割后保存的路径
                       ) -> Tuple[bool, Union[str, dict]]:
        import math
        if not os.path.isfile(file_path):
            return False, "文件不存在！"

        total_size = os.path.getsize(file_path)
        # 默认值

        real_spilt_size = 100 * 1024 * 1024
        real_spilt_num = math.ceil(total_size / real_spilt_size)

        if split_size:  # 使用自定义大小
            real_spilt_size = 1024 * 1024 * split_size
            real_spilt_num = math.ceil(total_size / real_spilt_size)

        elif split_num:  # 按照数量拆分
            real_spilt_num = split_num
            real_spilt_size = math.ceil(total_size / real_spilt_num)

        if real_spilt_num < 2:
            return False, "文件拆分数量最小为 2个 !"

        file_name = os.path.basename(file_path)
        if not save_path:  # 保存路径
            save_path = os.path.dirname(file_path)

        save_dir_name = "{file_name}_split".format(file_name=file_name)
        save_dir = os.path.join(save_path, save_dir_name)
        i = 1
        while os.path.isdir(save_dir):
            save_dir_name = "{file_name}_split-({ectype})".format(file_name=file_name, ectype=i)
            save_dir = os.path.join(save_path, save_dir_name)
            i += 1

        os.makedirs(save_dir)

        if not split_file_name:  # 切割文件名，默认为切割目标文件名
            file_ext_temp = file_name.split(".")
            if len(file_ext_temp) != 0:
                split_file_name = "{file_name}_sqlit_".format(file_name=".".join(file_ext_temp[:-1]))
            else:
                split_file_name = "{file_name}_sqlit_".format(file_name=file_name)

        if not split_file_ext:
            split_file_ext = ".bt_split"

        try:
            split_file_list = []
            with open(file_path, mode="rb") as f:
                for i in range(real_spilt_num):
                    sub_name = split_file_name + str(i) + split_file_ext
                    with open(os.path.join(save_dir, sub_name), mode="wb") as sub_f:
                        sub_f.write(f.read(real_spilt_size))
                    split_file_list.append(sub_name)
        except:
            return False, "文件拆分失败"

        split_config_info = {
            "name": file_name,
            "size": total_size,
            "split_size": real_spilt_size,
            "split_num": real_spilt_num,
            "md5": public.FileMd5(file_path),
            "split_file": split_file_list,
            "save_dir": save_dir,
        }
        split_config_path = os.path.join(save_dir, "split_config.bt_split_json")
        public.writeFile(split_config_path, json.dumps(split_config_info))

        public.ExecShell("chattr +i -R {split_dir}".format(split_dir=save_dir))
        return True, split_config_info

    # 合并文件
    @classmethod
    def join_file(cls,
                  file_path: str,  # 文件路径
                  save_path: str = None,  # 切割大小
                  ) -> Tuple[bool, str]:
        try:
            split_config_info = json.loads(public.readFile(file_path))
        except:
            return False, "配置文件读取错误！"

        split_file_dir = os.path.dirname(file_path)
        public.ExecShell("chattr -i -R {split_dir}".format(split_dir=split_file_dir))

        name = split_config_info.get("name")
        md5 = split_config_info.get("md5")
        split_file_list = split_config_info.get("split_file")
        if not all([name, md5, split_file_list]):
            return False, "配置文件损坏！"

        if not save_path:
            save_path = split_file_dir

        split_file_shell = "' '".join([os.path.join(split_file_dir, name) for name in split_file_list])
        save_file_path = os.path.join(save_path, name)

        shell = "cat '{split_file}' > '{save_file_path}'".format(
            split_file=split_file_shell,
            save_file_path=save_file_path,
        )
        public.ExecShell(shell)

        if not os.path.isfile(save_file_path):
            return False, "文件合并失败！"

        join_md5 = public.FileMd5(save_file_path)
        if md5 != join_md5:
            return False, "md5 校验文件损坏！"

        return True, save_file_path

    # 切割文件接口
    def SplitFile(self, get):
        if not hasattr(get, "file_path"):
            return public.returnMsg(False, "缺少参数 file_path!")
        file_path = get.file_path
        split_size = getattr(get, "split_size", None)
        split_num = getattr(get, "split_num", None)
        split_file_name = getattr(get, "split_file_name", None)
        split_file_ext = getattr(get, "split_file_ext", None)
        save_path = getattr(get, "save_path", None)

        if not os.path.isfile(file_path):
            return public.returnMsg(False, "文件不存在!")

        if split_size is not None:
            if str(split_size).isdigit():
                split_size = int(split_size)
            else:
                split_size = None

        if split_num is not None:
            if str(split_num).isdigit():
                split_num = int(split_num)
            else:
                split_num = None

        is_status, err = self.split_file_new(
            file_path=file_path,
            split_size=split_size,
            split_num=split_num,
            split_file_name=split_file_name,
            split_file_ext=split_file_ext,
            save_path=save_path
        )
        if is_status is False:
            return public.returnMsg(False, err)

        return {"status": True, "msg": "ok", "data": err}

    # 获取合并配置文件信息
    def JoinConfigFile(self, get):
        if not hasattr(get, "file_path"):
            return public.returnMsg(False, "缺少参数 file_path!")

        file_path = get.file_path
        if not os.path.isfile(file_path):
            return public.returnMsg(False, "合并配置文件不存在！")

        try:
            split_config_info = json.loads(public.readFile(file_path))
        except:
            return public.returnMsg(False, "配置文件读取错误！")

        return {"status": True, "msg": "ok", "data": split_config_info}

    # 合并文件
    def JoinFile(self, get):
        try:
            if not hasattr(get, "file_path"):
                return public.returnMsg(False, "缺少参数 file_path!")

            # 拼接路径
            file_path = get.file_path
            save_path = getattr(get, "save_path", None)

            if not os.path.isfile(file_path):
                return public.returnMsg(False, "合并配置文件不存在！")

            is_status, err = self.join_file(file_path=file_path, save_path=save_path)
            if is_status is False:
                return public.returnMsg(False, err)

            save_file_path = err

            join_file_info = {
                "name": os.path.basename(save_file_path),
                "path": save_file_path,
                "size": os.path.getsize(save_file_path),
            }
            return {"status": True, "msg": "合并成功！", "data": join_file_info}
        except Exception as err:
            pass

    # 添加文件历史记录
    def file_history(self, args):
        file_history_data = os.path.join(public.get_panel_path(), "data/file_history_data.json")
        path = args.path.strip()
        name = args.name.strip()

        if not os.path.exists(file_history_data):
            public.writeFile(file_history_data, '[]')

        if not path:
            return public.returnMsg(False, '请选择文件！')

        try:
            filedata = json.loads(public.readFile(file_history_data))
        except json.decoder.JSONDecodeError:
            filedata = []

        #  判断是否已经存在
        for data in filedata:
            if data["filename"] == name and data["filepath"] == path:
                data["time"] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
                filedata = sorted(filedata, key=lambda x: x['time'], reverse=True)
                public.writeFile(file_history_data, json.dumps(filedata))
                return public.returnMsg(True, '添加成功')

        content = {
            "filename": name,
            "filepath": path,
            "time": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()),
            "id": public.GetRandomString(12)
        }

        filedata.append(content)

        filedata = sorted(filedata, key=lambda x: x['time'], reverse=True)

        if len(filedata) > 10:
            filedata = filedata[:10]

        public.writeFile(file_history_data, json.dumps(filedata))

        return public.returnMsg(True, '添加成功')

    # 获取文件历史记录列表   最新10条
    def file_history_list(self, args):
        file_history_data = os.path.join(public.get_panel_path(), "data/file_history_data.json")

        if not os.path.exists(file_history_data):
            public.writeFile(file_history_data, '[]')
        data = public.readFile(file_history_data)
        if not data:
            data = '[]'
        data = json.loads(data)

        for item in data:
            item['historys'] = self.get_history(item["filepath"])

        return data

    # 删除文件历史记录
    def del_file_history(self, args):
        id = args.id
        file_history_data = os.path.join(public.get_panel_path(), "data/file_history_data.json")
        filedata = json.loads(public.readFile(file_history_data))

        for index, data in enumerate(filedata):
            if data["id"] == id:
                del filedata[index]
                break

        public.writeFile(file_history_data, json.dumps(filedata))

        return public.returnMsg(True, '删除成功')
    
    def set_backup_status(self,get):
        try:            
            p = crontab.crontab()
            return crontab.crontab().set_cron_status(get)
        except Exception as e:
            return public.returnMsg(False, "设置失败 "+str(e))
    def edit_backup_config(self, get):
        try:

            task_name = get['name']
            site_name = get['sName']
            get['urladdress']=""
            get['sBody']="btpython /www/server/panel/script/crontab_backupfiles.py --src_folder " + site_name
            # get['sType']="backup_site_file"

            p = crontab.crontab()
            # task_name = '[勿删]网站增量备份' + [{}]''.format(src_folder)

            if public.M('crontab').where('name=?', (task_name,)).count() == 0:
                resp = crontab.crontab().AddCrontab(get)
                if resp.get("status") is False :
                    return public.returnMsg(False, resp.get("msg"))
                
            else:
                get['id']=public.M('crontab').where('name=?', (task_name,)).getField('id')
                resp = crontab.crontab().modify_crond(get)
                if resp.get("status") is False :
                    return public.returnMsg(False, resp.get("msg"))

            return public.returnMsg(True, "设置成功！")
        except Exception as e:
            print(e)
            return public.returnMsg(False, "开启增量备份失败 "+str(e))


    def get_backup_config(self, get):
        try:
            src_folder = get['src_folder']
            src_folder_name = os.path.basename(src_folder)  # 提取源文件夹的名称
            backup_path = public.M('config').where("id=?", ('1',)).getField('backup_path')
            if not backup_path.endswith('/'):
                backup_path += '/'
            target_directory = '{}/backup_site_file'.format(backup_path)  # 备份文件所在的文件夹
            backup_folder = os.path.join(target_directory, src_folder_name)
            init_marker = os.path.join(backup_folder, 'initialized.pl')
            if os.path.exists(backup_folder):
                if not os.path.exists(init_marker):
                    public.ExecShell("btpython /www/server/panel/script/initialize_backup.py {}".format(src_folder))
            data = public.M('crontab').where('sName=?', (src_folder,)).select()
            result=[]
            if data:
                if "btpython /www/server/panel/script/crontab_backupfiles.py" in data[0]['sBody']:
                    result=data
            
            return public.returnMsg(True, result)
        except Exception as e:
            return public.returnMsg(False, "获取配置失败 " + str(e))



    def restore_backup(self, get):
        try:
            backup_id = get['backup_id']
            backup_file = get['backup_file']
            backup_info = public.M('backup_site_file').where('id=?', (backup_id,)).select()
            if backup_info:
                backupTo=backup_info[0]['backupTo']
                src_folder=backup_info[0]['src_folder']
                if backupTo!='localhost':   
                    return public.returnMsg(False, "暂不支持直接恢复云存储的备份文件！")       

                # 解析出源文件夹的路径
                if 'all' in backup_file:
                    filename = '/' + backup_file.split('_', 2)[-1].rstrip('.zip').replace('_', '/')
                else:
                    filename = '/' + backup_file.split('_', 1)[-1].rstrip('.zip').replace('_', '/')
                # 检查是否是全量备份，并去掉'_all'部分
                is_full_backup = '_all_' in backup_file
                if is_full_backup:
                    backup_file = backup_file.replace('_all_', '_')

                # 去掉时间戳部分
                backup_file = backup_file[15:]
                backup_path = public.M('config').where("id=?", ('1',)).getField('backup_path')
                dst_folder = '{}/backup_site_file'.format(backup_path) # 备份文件所在的文件夹
                backup_file_path = dst_folder + filename + '/' + get.backup_file
                # 如果是全量备份，删除源文件夹中的所有文件，除了.user.ini
                if is_full_backup:
                    for filename in os.listdir(src_folder):
                        file_path = os.path.join(src_folder, filename)
                        if filename != '.user.ini':
                            if os.path.isfile(file_path):
                                os.unlink(file_path)
                            elif os.path.isdir(file_path):
                                shutil.rmtree(file_path)
                # 解压备份文件到源文件夹
                with zipfile.ZipFile(backup_file_path, 'r') as zipf:
                    for member in zipf.infolist():
                        if '.user.ini' not in member.filename:  # 跳过.user.ini文件
                            zipf.extract(member, src_folder)

                return public.returnMsg(True, "恢复成功！")
            else:
                return public.returnMsg(False, "恢复失败！")
        except Exception as e:
            return public.returnMsg(False, "恢复失败！" + str(e))

    def delete_backup(self, get):
        try:
            backup_id = get['backup_id']
            backup_file = get['backup_file']
            backup_info = public.M('backup_site_file').where('id=?', (backup_id,)).select()
            backupTo=backup_info[0]['backupTo']
            if backupTo!='localhost':
                return public.returnMsg(False, "暂不支持直接删除云存储的备份文件！")       

            filename=backup_info[0]['filename']
            if os.path.exists(filename):
                public.M('backup_site_file').where('id=?', (backup_id,)).delete()
                os.remove(filename)
            else:
                return public.returnMsg(False, "备份文件不存在!")
            return public.returnMsg(True, "删除成功!")
        except Exception as e:
            return public.returnMsg(False, "删除失败！" + str(e))


    def download_backup(self, get):
        try:
            backup_file=get['backup_file']
            backup_id=get['backup_id']
            cron_id=get['cron_id']
            if not backup_id:
                if 'all' in backup_file:
                    src_folder = '/' + backup_file.split('_', 2)[-1].rstrip('.zip').replace('_', '/')
                else:
                    src_folder = '/' + backup_file.split('_', 1)[-1].rstrip('.zip').replace('_', '/')

                backup_path = public.M('config').where("id=?", ('1',)).getField('backup_path')
                dst_folder = '{}/backup_site_file'.format(backup_path) # 备份文件所在的文件夹
                backup_file_path = dst_folder + src_folder + '/' + backup_file

                # 检查备份文件是否存在
                if os.path.exists(backup_file_path):
                    return {'status': True, 'is_local': True, 'path': backup_file_path}
            else:
                
                backup_info = public.M('backup_site_file').where('id=?', (backup_id,)).select()
                backup_file_path=backup_info[0]['filename']           

                # 检查备份文件是否存在
                if os.path.exists(backup_file_path):
                    return {'status': True, 'is_local': True, 'path': backup_file_path}
        
                if "|webdav|" in backup_file_path:
                    import sys
                    if '/www/server/panel/plugin/webdav' not in sys.path:
                        sys.path.insert(0, '/www/server/panel/plugin/webdav')
                    try:
                        from webdav_main import webdav_main as webdav
                        path=webdav().cloud_download_file(get)['msg']
                    except:
                        return public.returnMsg(False, '请先安装webdav存储插件！')
                else:
                    path = backup_file_path.split('|')[0]
            

            if "|" not in backup_file_path:
                return public.returnMsg(False, '文件不存在！')
            cron_data = public.M('crontab').where('id=?', (get.cron_id,)).field('sName').find()
            cloud_name = backup_file_path.split('|')[1]
            file_name = backup_file_path.split('|')[-1]

            public.set_module_logs("files_download_backup", cloud_name)

            import CloudStoraUpload
            c = CloudStoraUpload.CloudStoraUpload()
            c.run(cloud_name)
            url = ''
            backup_path = c.obj.backup_path
            name= os.path.basename(cron_data['sName'])
            path = os.path.join(backup_path, 'backup_site_file', name )
            data = c.obj.get_list(path)
            for i in data['list']:
                if i['name'] == file_name:
                    url = i['download']
                    break
            if url == '':
                return public.returnMsg(False, '在云存储中未发现该文件!')
            return {'status': True, 'is_local': False, 'path': url}
        except:
            import traceback
            print(traceback.format_exc())
            return {'status': False, 'msg':"下载失败！"}
            
    
    def list_backups(self, get):
        cloud_name = {
            'localhost': "本地",
            'qiniu': "七牛云存储",
            'alioss': "阿里云oss",
            'ftp': "FTP存储空间",
            'bos': "百度云存储",
            'obs': "华为云存储",
            'aws_s3': "亚马逊s3云存储",
            'gdrive': "谷歌云网盘",
            'msonedrive': "微软onedrive",
            'gcloud_storage': "谷歌云存储",
            'upyun': "又拍云存储",
            'jdcloud': "京东云存储",
            'txcos': "腾讯云cos",
            'tianyiyun':"天翼云zos",
            'webdav':"webdav存储",
            'minio':"minio存储",
            'dogecloud':"多吉云cos"
        }

        try:
            # 获取前端传递的 cron_id
            src_folder = get.get('src_folder')
            cron_id=get.get('cron_id')
            backups = []
            if not cron_id:
                return public.returnMsg(True, backups)

            # backupTo="localhost"
            # 从数据库中获取备份记录
            db_backups = public.M('backup_site_file').where('cron_id=?', (cron_id,)).select()
            for backup in db_backups:
                file_path = backup['name']
                # file_names_in_db.add(os.path.basename(file_path))  # 记录数据库中的文件名
                # if "|" in backup['filename']:
                #     backupTo=backup['filename'].split('|')[1]
                if backup['backupTo']:
                    backupTo= backup['backupTo']
                else:
                    backupTo='localhost'
                
                size_in_kb=backup['size']/ 1024  # 将文件大小转换为KB
                if size_in_kb>=1024:
                    if size_in_kb/1024>=1024:
                        size='{:.2f} GB'.format(size_in_kb/1024/1024)
                    else:
                        size='{:.2f} MB'.format(size_in_kb/1024)
                else:
                    size='{:.2f} KB'.format(size_in_kb)
                # 检查文件是否存在于文件系统中
                # if file_path and os.path.exists(file_path):
                    # file_stat = os.stat(file_path)
                    # size_in_kb = file_stat.st_size / 1024  # 将文件大小转换为KB
              
                backup_info = {
                    'id': backup['id'],  # 返回数据库中的 id
                    'name': os.path.basename(file_path),
                    'time': backup['addtime'],  # 从数据库中获取时间
                    'size': size,
                    'type': '全量备份' if backup['type'] == 1 else '增量备份',
                    'backupTo':cloud_name[backupTo]
                }
                backups.append(backup_info)



            # 按时间倒序排序备份
            backups.sort(key=lambda x: x['time'], reverse=True)

            return public.returnMsg(True, backups)

        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return public.returnMsg(False, "获取备份文件失败 " + str(e))




    @staticmethod
    def get_page_with_limit_pages(count, p=1, rows=12, callback='', result='1,3,5,8', limit_pages=4 * 2):
        import page
        try:
            from BTPanel import request
            uri = public.url_encode(request.full_path)
        except:
            uri = ''
        page = page.Page()
        setattr(page, '_Page__LIST_NUM', max(limit_pages // 2, 1))
        info = {'count': count, 'row': rows, 'p': p, 'return_js': callback, 'uri': uri}
        data = {'page': page.GetPage(info, result), 'shift': str(page.SHIFT), 'row': str(page.ROW)}
        return data

    # 获取文件同步状态
    @staticmethod
    def _get_bt_sync_status_old(data):
        config_file = "{}/plugin/rsync/config4.json".format(public.get_panel_path())
        if not os.path.exists(config_file):
            data["bt_sync"] = {}
            return data
        try:
            conf = json.loads(public.readFile(config_file))
        except json.JSONDecodeError:
            data["bt_sync"] = {}
            return data

        dirs = [data['PATH'] + "/" + i.split(";", 1)[0] for i in data["DIR"]]
        res = [{} for _ in range(len(dirs))]
        for idx, d in enumerate(dirs):
            for value in conf.get("modules", []):
                if value.get("path", "").rstrip("/") == d:
                    res[idx] = {
                        "type": "modules",
                        "name": value.get("name", ""),
                        "status": value.get("recv_status", True),
                        "path": d,
                    }

        for idx, d in enumerate(dirs):
            for value in conf.get("senders", []):
                if value.get("source", "").rstrip("/") == d:
                    target = value.get("target_list", [{}])[0]
                    res[idx] = {
                        "type": "senders",
                        "name": target.get("name", ""),
                        "status": target.get("status", True),
                        "path": d,
                    }

        data["bt_sync"] = res
        return data

    # 获取文件同步状态
    @staticmethod
    def _get_bt_sync_status(data):
        config_file = "{}/plugin/rsync/config4.json".format(public.get_panel_path())
        if not os.path.exists(config_file):
            data["bt_sync"] = []
            return data
        try:
            conf = json.loads(public.readFile(config_file))
        except json.JSONDecodeError:
            data["bt_sync"] = []
            return data

        dirs = []
        for i in data["dir"]:
            dirs.append(data['path'] + "/" + i["sn"])

        res = [{} for _ in range(len(dirs))]
        for idx, d in enumerate(dirs):
            for value in conf.get("modules", []):
                if value.get("path", "").rstrip("/") == d:
                    res[idx] = {
                        "type": "modules",
                        "name": value.get("name", ""),
                        "status": value.get("recv_status", True),
                        "path": d,
                    }

        for idx, d in enumerate(dirs):
            for value in conf.get("senders", []):
                if value.get("source", "").rstrip("/") == d:
                    target = value.get("target_list", [{}])[0]
                    res[idx] = {
                        "type": "senders",
                        "name": target.get("name", ""),
                        "status": target.get("status", True),
                        "path": d,
                    }

        data["bt_sync"] = res
        return data

    @staticmethod
    def get_bt_sync_status(get):
        try:
            path = get.path.strip().rstrip("/")
        except AttributeError:
            return public.returnMsg(False, "参数错误")

        config_file = "{}/plugin/rsync/config4.json".format(public.get_panel_path())
        if not os.path.exists(config_file):
            return {
                "have_sync": False,
                "data": []
            }

        try:
            conf = json.loads(public.readFile(config_file))
        except json.JSONDecodeError:
            return {
                "have_sync": False,
                "data": []
            }

        results = []  # 存储匹配到的所有结果

        # 检查 modules 配置
        for value in conf.get("modules", []):
            if value.get("path", "").rstrip("/") == path:
                results.append({
                    "type": "modules",
                    "data": {
                        "name": value.get("name", ""),
                        "recv_status": value.get("recv_status", True),
                        "path": path
                    }
                })

        # 检查 senders 配置
        for value in conf.get("senders", []):
            if value.get("source", "").rstrip("/") == path:
                results.append({
                    "type": "senders",
                    "data": {
                        "id": value.get("id", ""),  # 获取外层 id
                        "name": value.get("title", ""),  # 使用外层 title
                        "status": value.get("status", True),
                        "path": path
                    }
                })

        # 返回结果
        return {
            "have_sync": len(results) > 0,
            "data": results
        }


    @staticmethod
    def create_install_wait_msg(task_id, soft, is_update):
        from panel_msg.msg_file import message_mgr
        install_status = "安装" if not is_update else "更新"
        file_path = "/tmp/panelExec.log"
        if not os.path.exists(file_path):
            public.writeFile(file_path, "")

        data = {
            "soft_name": soft,
            "install_status": "等待" + install_status + soft,
            "file_name": file_path,
            "self_type": "soft_install",
            "status": 0,
            "task_id": task_id
        }
        title = "等待" + install_status + soft
        res = message_mgr.collect_message(title, ["软件商店", soft], data)
        if isinstance(res, str):
            public.WriteLog("消息盒子", "安装信息收集失败")
            return None

        return res

    # 关键字搜索文件内容
    def SearchFilesData(self, get):
        '''
        @name 关键字搜索文件内容
        @author law<2023-12-12>
        @param path<string> 路径
        @param search<string> 关键字
        @return dict
        '''
        if not hasattr(get, 'path'):
            get.path = public.get_site_path()
        if sys.version_info[0] == 2:
            get.path = get.path.encode('utf-8')
        if not os.path.exists(get.path):
            get.path = '/www'
        search = get.search.strip().lower()
        my_files = []
        count = 0
        max = 3000
        for root, dirs, files in os.walk(get.path):
            if count >= max:
                break
            for f in files:
                f = self.xssencode(f)
                filename = os.path.join(root, f)

                if not os.path.exists(filename):
                    continue

                import chardet
                try:
                    with open(filename, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    with open(filename, 'r', encoding='ISO-8859-1') as f:
                        content = f.read()

                if content.lower().find(search) != -1:
                    my_files.append(self.__new_get_stat(filename, get.path))
                    count += 1

        data = {}
        data['result'] = my_files
        data['path'] = str(get.path)
        data['page'] = public.get_page(len(my_files), 1, max, 'GetFiles')['page']
        data['search'] = search
        return data

    def __new_get_stat(self, filename, path=None):
        tmp_path = (path + '/').replace('//', '/')
        if path and tmp_path != '/':
            filename = filename.replace(tmp_path, '', 1)

        file_info = {
            'name': os.path.join(path, filename),
        }

        return file_info

    def check_install_lib(self, mtype):
        from panelPlugin import panelPlugin
        return panelPlugin().check_install_lib(mtype)

    def mutil_unzip(self, get):
        try:
            sfile_list = json.loads(get.sfile_list.strip())
            dfile = get.dfile.strip()
            coding = get.coding.strip()
            type1 = get.type1.strip()
        except (AttributeError, json.JSONDecodeError):
            return public.returnMsg(False, "参数错误")

        res = []
        for sfile in sfile_list:
            if os.path.exists(sfile):
                get_obj = public.dict_obj()
                get_obj.sfile = sfile
                get_obj.dfile = dfile
                get_obj.coding = coding
                get_obj.type1 = type1
                res_data = self.UnZip(get_obj)
                res_data["sfile"] = sfile
                res.append(res_data)
            else:
                res.append({
                    "status": False,
                    "file": sfile,
                    "msg": "文件不存在"
                })

        return res

    @staticmethod
    def test_path(get=None):
        try:
            path = get.path.strip()
        except AttributeError:
            return public.returnMsg(False, "参数错误")

        if not os.path.exists(path):
            return {
                "path": "",
                "is_dir": None,
                "exists": False
            }

        if os.path.islink(path):
            real_path = os.path.abspath(os.readlink(path))
            if not os.path.exists(real_path):
                return {
                    "path": "",
                    "is_dir": None,
                    "exists": False
                }
        else:
            real_path = path

        return {
            "path": real_path,
            "is_dir": os.path.isdir(real_path),
            "exists": True,
        }

    def fix_permissions(self, get):
        if not hasattr(get, "uid"):
            import pwd
            get.uid = pwd.getpwnam('www').pw_uid
            get.gid = pwd.getpwnam('www').pw_gid
        path = get.path
        if os.path.isfile(path):
            os.chown(path, get.uid, get.gid)
            os.chmod(path, 0o644)
            return public.returnMsg(True, "权限修复成功")
        os.chown(path, get.uid, get.gid)
        os.chmod(path, 0o755)
        for file in os.listdir(path):
            try:
                filename = os.path.join(path, file)
                os.chown(filename, get.uid, get.gid)
                if os.path.isdir(filename):
                    os.chmod(filename, 0o755)
                    get.path = filename
                    self.fix_permissions(get)
                    continue
                os.chmod(filename, 0o644)
            except:
                print(public.get_error_info())
        return public.returnMsg(True,"权限修复成功")