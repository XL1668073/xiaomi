//准备一个空数组用来存放请求回来的json数组
let arr_flashshop=[]
let falg1=true//用来控制是否渲染分页器
//准备一个函数请求json数据
   //同时渲染页面和分页器
getlist()//先执行一遍先渲染页面
function getlist(){
    $.ajax({
        url:"../lib/flashlist.json",
        dataType:"json",
        success:function(res){
            arr_flashshop=res//将传回的res赋给全局变量arr——flashshop
            //用传回的res作为实参来渲染分页器(res是一个数组)
            //第一次执行getList时候渲染一次，之后不用渲染
            falg1 && get_paji(res);//前面为true执行后面，前面为false直接跳过后面
            bindHtml(res.slice(0,6));//渲染第一页/slice选中的是012345索引的数据
        }
    })
}
//准备一个渲染页面的函数
function bindHtml(res){
    let str="";
    res.forEach(item=>{
        str+=`
        <li data-id="${ item.list_id }">
        <img src="${item.list_url}" alt="">
        <div>
            <h3 class="name">${item.list_name}</h3>
            <p class="desc">${item.list_desc}</p>
            <span class="price">${item.list_price}</span>
            <button class="btn" >查看详情</button>
        </div>
        </li>
        `
    })
    $(".list-box").html(str)
}
//准备一个渲染分页器

function get_paji(res){
    falg1=false//第一次执行之后就不用执行
    $(".pagi").pagination({
        pageCount: Math.ceil(res.length / 6), // 总页数每页显示6个
        current: 1, // 当前页默认页面
        jump: true,
        coping: true,
        homePage: '首页', 
        endPage: '末页', 
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
            let curr = api.getCurrent()//获取当前是第几页
            let newlist = res.slice((curr - 1) * 6, curr * 6)//第几页就从res里面筛选
            bindHtml(newlist)//每次分页器使用时重新渲染页面 
        }
    })
}

//准备一个排序按钮的点击事件
let flag=true//先准备一个
$(".sort").click(function(){
    flag=!flag;//用来判断升序降序
    arr_flashshop.sort(function(a,b){//重新构造数组
        if (flag===true){
            return a.list_price - b.list_price//升序
        }else{
            return b.list_price - a.list_price//降序
        }
    })
    get_paji(arr_flashshop)//渲染排序过后的分页器
    bindHtml(arr_flashshop.slice(0,6))//重新渲染第一页
})

 // 3. 给每一个li添加绑定事件跳转页面
 $('.list-box').on('click', 'li', function () {
    const id = $(this).data('id')//获取每一个li的自定义属性id的值
    let data = {}//准备一个空对象，用来存储数组里面点击的哪一个对象
    for (let i = 0; i < arr_flashshop.length; i++) {
      if (arr_flashshop[i].list_id === id) {//从数组中找到一样的哪个id的数据
        data = arr_flashshop[i]
        break
      }
    }
    localStorage.setItem('shop_detail', JSON.stringify(data))//加入到localstorage
    window.location.href = './detail.html'//跳转详情页面
  })


