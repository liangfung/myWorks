
/*
传参说明:

   1.parentNode:图片组合节点的父节点（此元素overflow:hidden;）
   2.obj:图片组合节点
   3.len： 不同的图片的数量
   4.下方的按钮，可以根据功能选择性传参（已经做了判断）
   5.obj的子节点数量的设置，要根据需求求出，比如，一次性展示多少图片

   *传参时,  parentNod,obj和list 要加引号

 */

//stat swiper
function swiper(obj,offset,len,list){  
  
  //定义在作用域中的变量，封装后可以通过传参重用（因为作用域的原理，对上一层作用域无影响）
  var pic_list = document.getElementById(obj);
  var con = pic_list.parentNode;
  var prev = getByClass(con,'prev')[0];  
  var next = getByClass(con,'next')[0]; 
  var onOff = true;            //开关，确定在图片移动过程中，点击无效
  var num = 1;                 //在swiper作用域中的全局变量，控制图片left值和按钮
  var timer = null;

  prev.style.top = (parseInt(con.style.heigth) - parseInt(prev.style.height))/2 + 'px';

  if(list){                    //将程序写成通用，有没有下面的按钮都可以使用
    var olist = document.getElementById(list);
    var aLi = olist.children;
    showBtn();
    autoPlay();
    for (var i=0;i<aLi.length;i++){
    aLi[i].index = i; 
    aLi[i].onclick = function(){
      var myindex = this.index + 1;
      var speed = 1;
      if(myindex - num >0){
        speed = myindex - num;
      } 
      if(myindex - num < 0){
        speed = num - myindex;
      }
      num = myindex;               //计算index差值，以确定 图片移动距离 和 移动速度

      doMove(pic_list,'left',30*speed,num*(-offset));
      showBtn();
    }
  }
    function showBtn(){
      for (var i=0;i<aLi.length;i++){
        aLi[i].className = '';
      }
      if(num > len){
        aLi[0].className = 'active';              //到最后一张时，按next，aLi的第一个 active
      }else if(num == 0){
        aLi[len - 1].className = 'active';        //到第一张时，按prev，aLi的最后一个 active
      } else {
        aLi[num-1].className = 'active';          //中间的情况
      }
    }
  }

  con.onmouseover = function(){                  
    clearInterval(timer);
    prev.style.visibility = 'visible';            //prev和next按钮，以通用
    next.style.visibility = 'visible';
  }

  con.onmouseout = function(){
    list && autoPlay();
    prev.style.visibility = 'hidden';            //prev和next按钮，以通用
    next.style.visibility = 'hidden';
  }

  function autoPlay(){
    clearInterval(timer);
    timer = setInterval(function(){
      next.onclick();
    },3000)
  }

  prev.onclick = function(){ 
    prevChange(pic_list);
    list && showBtn();                          //在传参时有传入按钮的话，执行showbtn,没有传入则不执行
  }
  next.onclick = function(){
    nextChange(pic_list);
    list && showBtn();
  }

  function prevChange(obj){
    if(onOff){                                        //通过开关判断以及控制 domove 的执行状况
      onOff = false;
      num--;
      doMove(obj,'left',30,num*(-offset),function(){       //此处添加回调函数，还原left值，以无限循环
        onOff = true;
        if(num == 0) {
          num = len;
          obj.style.left = -offset*len +'px';
        }
      }); 
    }
  }
  function nextChange(obj){
    if(onOff){
      onOff = false;
      num++;
      doMove(obj,'left',30,num*(-offset),function(){
        onOff = true;
        if(num > len){
          num = 1;
          obj.style.left = -offset + 'px';
        }
      });
    }                           //同上
  }

}
// end swiper

function doMove( obj,attr,dir,target,endFn ){                       //domove函数，通用
  dir = parseInt(getStyle(obj,attr)) < target ? dir : -dir;
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    var speed = parseInt(getStyle(obj,attr)) + dir ;
    if(speed > target && dir > 0 || speed < target && dir < 0){
      speed = target;
    }
    obj.style[attr] = speed + 'px';
    if(speed == target){
      clearInterval(obj.timer); 
      endFn && endFn();
    }
  },30);
}


//此函数用于获取元素的属性
function getStyle( obj,attr ){ return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]; }

//封装的用class获取节点的函数
function getByClass(oParent,sClass){
  var aResult = [];
  var aEle = oParent.getElementsByTagName('*');
  for(var i=0;i<aEle.length;i++){
    if( aEle[i].className == sClass ){
      aResult.push(aEle[i]);
    }
  }
  return aResult;
}
