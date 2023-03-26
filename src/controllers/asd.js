Detalle.sequelize.transaction( async (t) => {
    var Promises=[];
    for(var i = 0 ; i<idProducto_b.length;i++)
    {
        var newPromise=Detalle.update({
            cantidad:cantidadArticulo_b[i],
            subtotal : cantidadArticulo_b[i] * precioUnidad_b[i] 
        },            
        {
            transaction: t,
            where:{id_producto : idProducto_b[i]}
        });
        Promises.push(newPromise);
    };
    return Promise.all(Promises).then(()=> {
        
        return res.redirect('/cart')})
        .catch(error => res.send(error))
    })