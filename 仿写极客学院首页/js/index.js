

swiper('swiper_container_1',560,5,'pagination');  //顶部轮播图
swiper('focuswork_swiper',186.5,4);				  //课程轮播			
swiper('company_swiper',160,8);                   //合作公司轮播
swiper('media_box_content',160,8);                //合作媒体轮播



//标签页
var hot_lessonbox = document.getElementById('hot-lessonbox');
var lesson = hot_lessonbox.children[0];
var aLesson_box = lesson.children;
var lesson_list = document.getElementById('lesson_list');
var aLesson = lesson_list.children;
var aLesson_len = aLesson.length;

for(var i=0;i<aLesson_len;i++){
	aLesson[i].index = i;
	aLesson[i].onmouseover =function (){
		for(var j=0;j<aLesson_len;j++){
			aLesson[j].className = '';
		}
		this.className = 'active';
		for(var j=0;j<aLesson_len;j++){
			aLesson_box[j].style.display = 'none';
		}
		aLesson_box[this.index].style.display = 'block';
	}
	// alert(lesson_box[this.index]);
}

