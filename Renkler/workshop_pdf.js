// Offline A4 export of the current painting, without browser headers or footers.
async function downloadA4Pdf() {
  const svg=document.querySelector('#drawing svg');
  const image=new Image();
  const source=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));
  try {
    await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=source;});
    const canvas=document.createElement('canvas');canvas.width=3200;canvas.height=Math.round(3200*200/540);
    const context=canvas.getContext('2d');context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
    const pdf=await PDFLib.PDFDocument.create();pdf.setTitle('Köy resmi - A4');
    const page=pdf.addPage([841.8898,595.2756]);
    const picture=await pdf.embedPng(canvas.toDataURL('image/png'));
    const width=841.8898-68,height=width*canvas.height/canvas.width;
    page.drawImage(picture,{x:34,y:(595.2756-height)/2,width,height});
    const url=URL.createObjectURL(new Blob([await pdf.save()],{type:'application/pdf'}));
    const a=document.createElement('a');a.href=url;a.download='benim-koyum-A4.pdf';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
  } finally {URL.revokeObjectURL(source);}
}
