export default{
    addCart(context,payload){
        //查找之前数组是否有商品
        let oldProduct=context.state.cartList.find(item => item.iid === payload.iid)
        //判断oldproduct
        if(oldProduct){
            context.commit('addCounter',oldProduct)
        } else{
            payload.count=1
            context.commit('addToCart',payload)
        }
    }
}