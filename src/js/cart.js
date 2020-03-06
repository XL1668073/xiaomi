//获取购物车中的数据
let cartList=JSON.parse(localStorage.getItem("cartList"))


//判断localstroage中cartList是否有数据
if(cartList){
    bindHtml()
    bindEvent()
}else{
    alert("购物车还没有东西，快去选购吧")
    window.location.href = './list.html'
}


//渲染页面
function bindHtml(){
    //渲染全选按钮(不渲染的话手动刷新时不管有没有选中都会不选中)
    let selectAll=cartList.every(item=>{
        //判断是不是所有的单选都是选中，是就是true
        return item.isSelect===true
    })
    
    if(selectAll){
        $("#selectAll").prop("checked","checked")
    }else{
        $("#selectAll").prop("checked","")
    };

    //渲染商品数据
    let str=""
    cartList.forEach(item=>{
        str+=`
            <tr>
                <td><input type="checkbox" class="selectOne"  ${ item.isSelect ? 'checked' : '' } data-id=${ item.list_id }></td>
                <td><img src="${item.list_url}" alt=""></td>
                <td style="width:45%;">${item.list_name}</td>
                <td>${item.list_price}</td>
                <td>
                    <input type="button" value="-" class="btn btn-info btn-sm sub" data-id=${ item.list_id } />
                    <input type="text" value="${item.number}" disabled style="width:80px"/ class="num">
                    <input type="button" value="+" class="btn btn-info btn-sm add" data-id=${ item.list_id } />
                </td>
                <td>${item.xiaoji}</td>
                <td><input type="button" value="删除" class="btn btn-danger del"  data-id=${ item.list_id }></td>
            </tr>
        `
    })
    $("#tb").html(str)
    
    //渲染底部
    let selectArr = cartList.filter(item => item.isSelect)
    // console.log(selectArr)

    // 选中商品数量计算
    let selectNumber = 0
    // 选中商品总价
    let selectPrice = 0
    selectArr.forEach(item => {
      selectNumber += item.number
      selectPrice += item.xiaoji
    })

    let bottom=""
    bottom+=`
        <p>选中商品数量 : <span>${ selectNumber }</span></p>
        <p>总价： <span>￥ ${ selectPrice.toFixed(2) }</span></p>
        <button class="pay btn btn-info btn-sm " ${ selectArr.length ? "" : 'disabled'} >去支付</button>
        <button class="delMore btn btn-danger">删除所选</button>
        <button class="clear btn btn-danger">清空购物车</button>
    `
    $(".bottom").html(bottom)
}

//事件集合
function bindEvent(){
    //全选框切换事件
    $('.cart').on('change', '.selectAll', function () {
        cartList.forEach(item => {
            //让所有的对象里面控制是否选中的属性，设置成全选的checked属性值
          item.isSelect = this.checked
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
      })
    //单选框切换事件
    $('.cart').on('change', '.selectOne', function () {
        const id = $(this).data('id')
        cartList.forEach(item => {
          if (item.list_id === id) {
            //让控制是否选中的属性取反，原本是false(没有钩)变成true，再刷新页面他也是选中的
            item.isSelect = !item.isSelect
          }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    //减少按钮的点击事件
    $('.cart').on('click', '.sub', function () {
        const id = $(this).data('id')
        cartList.forEach(item => {
          if (item.list_id === id) {
            item.number > 1 ? item.number-- : alert('不能再减了')
            item.xiaoji = item.list_price * item.number
          }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    //添加按钮的点击事件
    $('.cart').on('click', '.add', function () {
        const id = $(this).data('id')
        cartList.forEach(item => {
          if (item.list_id === id) {
            item.number++
            item.xiaoji = item.number * item.list_price
          }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    //删除按钮点击事件
    $('.cart').on('click', '.del', function () {
        //点击的删除按钮->它所在的td->他所在的tr->删除tr以及它下面的所有子元素
        // $(this).parent().parent().remove()//只删除了页面上的数据，localStorage里的还没删除
        const id = $(this).data('id')
        //把原本的购物车列表，筛选出了删除的以外的元素，cartList重新赋值，
        cartList = cartList.filter(item=>{
            return item.list_id !== id
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    //清空购物车按钮点击事件
    $('.cart').on('click', '.clear', function () {
        $("tr").remove()//移除所有的以及他的子元素或者移除tbday
        cartList=[]//把购物车列表清空
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
        
        alert("购物车还没有东西，快去选购吧")
        window.location.href = './list.html'
    })
    //删除所选按钮点击事件
    $('.cart').on('click', '.delMore', function () {
        cartList = cartList.filter(item=>{
            return item.isSelect !== true
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
}