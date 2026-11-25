from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
import os,re,sys,time,urllib.request,subprocess,webbrowser
ROOT=Path(__file__).resolve().parent.parent;PORT=8946;URL=f'http://127.0.0.1:{PORT}/OyunlarVeOyuncaklar/'
class Handler(SimpleHTTPRequestHandler):
 protocol_version='HTTP/1.1'
 def end_headers(self):
  self.send_header('Accept-Ranges','bytes');self.send_header('Cache-Control','no-cache');self.send_header('X-DersAI-Preview','1');super().end_headers()
 def send_head(self):
  self.byte_range=None;path=self.translate_path(self.path)
  if os.path.isdir(path):return super().send_head()
  try:f=open(path,'rb')
  except OSError:self.send_error(404,'File not found');return None
  size=os.fstat(f.fileno()).st_size;start=0;end=size-1;range_header=self.headers.get('Range')
  if range_header:
   match=re.fullmatch(r'bytes=(\d*)-(\d*)',range_header.strip())
   if not match:f.close();self.send_error(416,'Invalid range');return None
   lo,hi=match.groups()
   if not lo:start=max(0,size-int(hi))
   else:start=int(lo);end=min(end,int(hi)) if hi else end
   if start>end or start>=size:
    f.close();self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.send_header('Content-Length','0');self.end_headers();return None
   self.byte_range=(start,end);self.send_response(206);self.send_header('Content-Range',f'bytes {start}-{end}/{size}');f.seek(start)
  else:self.send_response(200)
  self.send_header('Content-Type',self.guess_type(path));self.send_header('Content-Length',str(max(0,end-start+1)));self.send_header('Last-Modified',self.date_time_string(os.fstat(f.fileno()).st_mtime));self.end_headers();return f
 def copyfile(self,source,outputfile):
  if self.byte_range is None:return super().copyfile(source,outputfile)
  remaining=self.byte_range[1]-self.byte_range[0]+1
  while remaining>0:
   chunk=source.read(min(65536,remaining))
   if not chunk:break
   try:outputfile.write(chunk)
   except (BrokenPipeError,ConnectionResetError):break
   remaining-=len(chunk)
 def log_message(self,fmt,*args):pass

def ready():
 try:
  with urllib.request.urlopen(urllib.request.Request(URL,method='HEAD'),timeout=1) as r:return r.headers.get('X-DersAI-Preview')=='1'
 except Exception:return False
if __name__=='__main__':
 if '--serve' in sys.argv:
  print('DersAI local classroom: '+URL,flush=True);ThreadingHTTPServer(('127.0.0.1',PORT),partial(Handler,directory=str(ROOT))).serve_forever()
 else:
  if not ready():
   flags=getattr(subprocess,'CREATE_NO_WINDOW',0);subprocess.Popen([sys.executable,str(Path(__file__).resolve()),'--serve'],creationflags=flags)
   for _ in range(30):
    if ready():break
    time.sleep(.1)
  if not ready():raise SystemExit('Ders acilamadi. 8946 portunu kullanan baska bir program olabilir.')
  webbrowser.open(URL)
