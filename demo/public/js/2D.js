<script Language="javascript">
/****************** JS2D函数集  *******************

  作者：neweroica    2003-3-28

  CopyRight (C) 2003

  在引用或转载时请保留此版权信息，谢谢!!!

  本函数集可以单独存成一个js文件："JS2D.js"

***************************************************/

/************* 画点 **************
  x,y     点所在的屏幕坐标（像素）
  color   颜色（字符串值）
  size    大小（像素）
**********************************/
function drawDot(x,y,color,size){
  document.write("<table border='0' cellspacing=0 cellpadding=0><tr><td style='position: absolute; left: "+(x)+"; top: "+(y)+";background-color: "+color+"' width="+size+" height="+size+"></td></tr></table>")
}

/************* 画直线 **************
  x1,y1   起点所在的屏幕坐标（像素）
  x2,y2   终点所在的屏幕坐标（像素）
  color   颜色（字符串值）
  size    大小（像素）
  style   样式
          =0    实线
          =1    虚线
          =2    虚实线
**********************************/
function drawLine(x1,y1,x2,y2,color,size,style){
  var i;
  var r=Math.floor(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
  var theta=Math.atan((x2-x1)/(y2-y1));
  if(((y2-y1)<0&&(x2-x1)>0)||((y2-y1)<0&&(x2-x1)<0))
    theta=Math.PI+theta;
  var dx=Math.sin(theta);//alert(dx)
  var dy=Math.cos(theta);
  for(i=0;i<r;i++){
    switch(style){
      case 0:
        drawDot(x1+i*dx,y1+i*dy,color,size);
        break;
      case 1:
        i+=size*2;
        drawDot(x1+i*dx,y1+i*dy,color,size);
        break;
      case 2:
        if(Math.floor(i/4/size)%2==0){
          drawDot(x1+i*dx,y1+i*dy,color,size);
        }
        else{
            i+=size*2;
            drawDot(x1+i*dx,y1+i*dy,color,size);
        }
        break;
      default:
        drawDot(x1+i*dx,y1+i*dy,color,size);
        break;
    }
  }
}

/************* 画实心矩形 **************
  x1,y1   起点（矩形左上角）所在的屏幕坐标（像素）
  x2,y2   终点（矩形右下角）所在的屏幕坐标（像素）
  color   颜色（字符串值）
**********************************/
function drawFilledRect(x1,y1,x2,y2,color){
  document.write("<table border='0' cellspacing=0 cellpadding=0><tr><td style='position: absolute; left: "+(x1)+"; top: "+(y1)+";background-color: "+color+"' width="+(x2-x1)+" height="+(y2-y1)+"></td></tr></table>")
}

/************* 画矩形 **************
  x1,y1   起点（矩形左上角）所在的屏幕坐标（像素）
  x2,y2   终点（矩形右下角）所在的屏幕坐标（像素）
  color   颜色（字符串值）
  size    大小（像素）
  style   样式
          =0    实线
          =1    虚线
          =2    虚实线
**********************************/
function drawRect(x1,y1,x2,y2,color,size,style){
  drawLine(x1,y1,x2,y1,color,size,style);
  drawLine(x1,y2,x2,y2,color,size,style);
  drawLine(x1,y1,x1,y2,color,size,style);
  drawLine(x2,y1,x2,y2,color,size,style);
}

/************* 画椭圆 **************
  x,y         中心所在的屏幕坐标（像素）
  a,b         长轴和短轴的长度（像素）
  color       颜色（字符串值）
  size        大小（像素）
  precision   边缘精细度
**********************************/
function drawOval(x,y,a,b,color,size,precision){
  var i;
  var iMax=2*Math.PI;
  var step=2*Math.PI/(precision*Math.sqrt(a*b)*4.5);
  for(i=0;i<iMax;i+=step){
    drawDot(x+a*Math.cos(i),y+b*Math.sin(i),color,size);
  }
}

/************* 画多边形 **************
  x,y     中心所在的屏幕坐标（像素）
  r       多边形外接圆半径（像素）
  n       多边形的边数
  color   颜色（字符串值）
  size    大小（像素）
  style   样式
          =0    实线
          =1    虚线
          =2    虚实线
**********************************/
function drawPoly(x,y,r,n,color,size,style){
  var i;
  var theta=Math.PI;
  var x1=x,y1=y-r,x2,y2;
  for(i=0;i<n;i++){
    theta-=(2*Math.PI/n);
    x2=x+r*Math.sin(theta);
    y2=y+r*Math.cos(theta);
    drawLine(x1,y1,x2,y2,color,size,style);
    x1=x2;
    y1=y2;//alert(x1+" "+y1)
  }
}
</script>


<script>
//****************** JS2D函数集示例  *******************
drawLine(20,20,300,20,"#0000cc",2,0);
drawLine(20,40,300,40,"#0000cc",2,1);
drawLine(20,60,300,60,"#0000cc",2,2);
drawFilledRect(20,80,300,200,"009900");
drawRect(20,220,220,320,"ff0000",2,0);
drawRect(240,220,440,320,"ff0000",2,1);
drawRect(460,220,660,320,"ff0000",2,2);
drawOval(250,450,120,50,"006600",1,1);
drawOval(250,650,120,120,"006600",2,0.5);
drawPoly(200,900,100,3,"ff8800",2,0);
drawPoly(400,900,100,4,"ff8800",2,1);
drawPoly(600,900,100,5,"ff8800",2,2);
drawPoly(200,1100,100,6,"ff8800",2,0);
drawPoly(400,1100,100,7,"ff8800",2,1);
drawPoly(600,1100,100,12,"ff8800",2,2);
</script>