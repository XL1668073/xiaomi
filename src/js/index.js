      
var mySwiper = new Swiper ('.swiper-container', {
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



//倒计时抢购
function a(n){//当为0时在前面补一个0
    return n<10 ? "0"+n : n;
}
let future_time=new Date('2020-3-3 20:42:30');
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


