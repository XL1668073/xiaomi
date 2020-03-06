
//放大镜功能
jQuery(function(){
   
    $(".my-foto").imagezoomsl({
      
       zoomrange: [3, 3]
    });
 });   


//取出传进商品详情中的数据
let info = JSON.parse( localStorage.getItem("shop_detail") )
if(!info){//判断是否取到了数据
    alert("请返回清单页面点击")
    window.location.href = './list.html'
}

//渲染页面
bindHtml(info)
function bindHtml(item){
    let str="";
        str+=`
        <div class="main" id="main">
            <img src="${item.list_url}" alt=""  class="my-foto">
            <div>
                <h3 class="name">${item.list_name}</h3>
                <p class="desc">${item.list_desc}</p>
                <span class="price">${item.list_price}</span>
                <button class="addCart-btn" >加入购物车</button>
                <a href="./cart.html">查看购物车</a>
                <a href="./list.html">返回清单页</a>
            </div>
        </div>
        `
    $(".container").html(str)
}

//绑定添加到购物车的点击事件
$(".addCart-btn").on("click",function(){
    
    //取出本地中的购物车json数组，如果没有列表就创建一个空数组
    const cartList=JSON.parse(localStorage.getItem('cartList')) || []
    //判断本地的购物车json数组中有没有详情页面中的这个商品
    let flag=cartList.some(item=>{//some函数返回的是一个布尔值
        return item.list_id===info.list_id//如果找到了id相同的就是true
    })
    if(flag===false){
        //没有找到，添加一些属性再加入到cartList数组中
        info.number=1//用来表示购买的数量
        info.xiaoji=info.list_price*info.number//用来表示小计
        info.isSelect = false//用来填充购物车的全选和单选的状态
        cartList.push(info)//将修改后的对象添加到cartList数组中
    }else{
        //找到了，就让他的数量加1个
        for(let product of cartList){
            if(product.list_id===info.list_id){//在carList数组中找到相同id的对象
                product.number++//把这个对象的—_num属性加1
                product.xiaoji=product.list_price*product.number//重新计算小计
            }
        }
    }
    //最后将carList数组放到localStorage中
    localStorage.setItem('cartList', JSON.stringify(cartList))
})