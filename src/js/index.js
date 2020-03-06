//get nav_list渲染nav里面的导航栏内容
get_nav_list();
function get_nav_list(){
    $.ajax({
        url:"../lib/nav_top.json",
        dataType:"json",
        success:function (res){
            console.log(res);
            let str=""
            res.forEach(item=>{
                str += `<li><a>${item.name}</a></li>`//将数据写入nav_top一级菜单
            })
            $(".nav>ul")
                .html(str)//将src写入.html
                .hover(//控制移入nav_top时nav_box的显示隐藏
                    function (){$('.nav_box').stop().slideDown()},
                    function (){$('.nav_box').stop().slideUp()}
                )
                .children("li")//到.nav_ul的每一个子li
                .on("mouseover",function (){
                    const index=$(this).index()//打标记
                    const list=res[index].list//找到json文件里面的对应数据
                    let str=""
                    list.forEach(item=>{//遍历
                        str +=`
                        <li><a href="">
                            <div>
                            <img src="${item.list_url}" alt="">
                            </div>
                            <p>${item.list_name}</p>
                            <span>${item.list_price}</span>
                        </a></li>
                        `
                    })
                    $('.nav_box > ol')
                        .html(str)
                })
            $(".nav_box")
                .hover(
                    function () { $(this).finish().show() },
                    function () { $(this).finish().slideUp() }
                )
        },

    })
}

//渲染banner区域的nav导航栏内容
get_banner_nav();
function get_banner_nav(){
    $.ajax({
        url:"../lib/nav_banner.json",
        dataType:"json",
        success:function (res){
            console.log(res);
            let str="";
            res.forEach(item=>{
                str+=`<li><a>${item.name}</a></li>`
            });
            $(".banner>ul")
                .html(str)
                .hover(//这样写没有下拉和上浮的动画
                    function(){$(".banner>ol").stop().show()},
                    function(){$(".banner>ol").stop().hide()}
                )
                .children("li")//到.nav_ul的每一个子li
                .on("mouseover",function (){
                    const index=$(this).index()//打标记
                    const list=res[index].list//找到json文件里面的对应数据
                    // console.log(list)
                    let str=""
                    list.forEach(item=>{//遍历
                        str +=`
                        <li><a href="">
                            <img src="${item.list_url}" alt="">
                            <span>${item.list_name}</span>
                        </a></li>
                        `
                    })
                    $('.banner > ol')
                        .html(str)//将创建的内容写入ol中
                        .css('width',265*Math.ceil(list.length/5))//控制ol的宽度
                        .hover(//设置移入移除样式
                            function () { $(this).finish().show() },
                            function () { $(this).finish().hide() }
                        )
                })
        }
    })
}

//渲染小米快闪轮播图
get_shop_swiper();
function get_shop_swiper(){
    $.ajax({
        url:"../lib/flashlist.json",
        dataType:"json",
        success:function(res){
            console.log(res);
            let str="";
            res.forEach(item=>{
                str+=`
                <li class="swiper-slide">
                    <img src="${item.list_url}" alt="">
                    <h3>${item.list_name}</h3>
                    <p>${item.list_desc}</p>
                    <span>${item.list_price}</span>
                </li>`
            })
            $(".shopswiper>ul")
                .html(str)
        }
    })
}

var mySwiper2 = new Swiper ('.shopswiper', {
      loop: true, // 循环模式选项
      // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
      autoplay : true,     
      speed:1000,
      loop : true,
      freeMode:true,
      slidesPerView : 4,
      slidesPerGroup : 4
    })    
//swiper轮播图 
var mySwiper = new Swiper ('.bannerswiper', {
    loop: true, // 循环模式选项
    autoplay:{
        delay:3000,
    },
    // 如果需要分页器
    pagination: {
    el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
    el: '.swiper-scrollbar',
    }
})

// var swiper = new Swiper('.shopswiper', {
//      slidesPerView: 1,
//     slidesPerView: "auto",


//     slidesPerGroup: 1,
//     loop: true,
//     autoplay: {
//       delay: 1000
//     },
//     loopFillGroupWithBlank: true,
//     navigation: {
//       nextEl: '.left',
//       prevEl: '.right',
//     },
//   });

//倒计时抢购
function a(n){//当为0时在前面补一个0
    return n<10 ? "0"+n : n;
}
let future_time=new Date('2020-3-20 20:42:30');
function print_time(){
    let now_time=new Date();//现在时间
    let remaining_time=Math.ceil((future_time-now_time)/1000);//时间差
    let nums=$(".time>span");//获取三个显示位置
    if(remaining_time>=0){//时间大于0
        var hour=Math.floor(remaining_time/3600);//获得时
        var min=Math.floor(remaining_time%3600/60);//获得分
        var sec=remaining_time%60;//获得秒
    }
    else{//时间小于0
        for(let i=0;i<nums.length;i++){
            nums[i].innerText="00";
        } 
        clearInterval(timer);//清除定时器
    }
    console.log( $(".time>span").eq(0));
    $(".time>span").eq(0).text(`${a(hour)}`);
    $(".time>span").eq(1).text(`${a(min)}`)
    $(".time>span").eq(2).text(`${a(sec)}`)
}
let timer=setInterval(print_time,1000);

//tab选项卡切换
$(".jiadian>a").click(function (){
    $(this)
      .addClass("active")
      .siblings("a")
      .removeClass("active")
    console.log($(this).index()-2)
    $(".jiadian>ul")
      .removeClass("active")
      .eq($(this).index()-3)//这里的index()是a元素再父元素中的索引号，为什么不是减二，这地方比较迷，跟html结构有关
      .addClass("active")
        
})
