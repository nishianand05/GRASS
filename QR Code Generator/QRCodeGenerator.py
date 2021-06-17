import qrcode
import sys,time
from PIL import Image
def gen_qr(data,img_path='.',img_filename='qr_code'):
    qr = qrcode.QRCode(
        version=2,
        box_size=15,
        border=5
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color='green', back_color='white')
    
    logo_display = Image.open('Component 3 – 1.png')
    logo_display.thumbnail((100, 100))
    
    logo_pos = ((img.size[0] - logo_display.size[0]) // 2, (img.size[1] - logo_display.size[1]) // 2)
    img.paste(logo_display, logo_pos)
    
    img.save(img_path+'\\'+img_filename+'_'+str(time.time())+'.png')

    
if __name__ == '__main__':
    a=int(input("How many QR Codes do you want?:"))
    b=int(input("Start serial no. :"))
    c=input("Reward point:")
    for i in range(a):
        input_text = "QR"+str(b+i)+c
        print(input_text)
        gen_qr(input_text)
