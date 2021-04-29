const cart = []
// let id = 1

module.exports = {

    getAll: (req, res) =>{
        const dbInstance = req.app.get('db')

        dbInstance.read_shoes()
        .then(shoes => res.status(200).send(shoes))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    newRelease: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.new_shoes()
        .then(shoes => res.status(200).send(shoes))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    getPop: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.popular_shoe()
        .then(shoes => res.status(200).send(shoes))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    highToLow: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.price_high_low()
        .then(shoes => res.status(200).send(shoes))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    lowToHigh: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.price_low_high()
        .then(shoes => res.status(200).send(shoes))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    nameSort: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.shoe_name_sort()
        .then(shoes => res.status(200).send(shoes))
        .catch(err => {
            res.sendStatus(500).send(console.log(err))
        })
    },

    getBrand: (req, res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params

        dbInstance.read_shoe_brand(id)
        .then(shoe => res.status(200).send(shoe))
        .catch(err => {
            res.sendStatus(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
            console.log(err)
        })
    },

    sortBrandbyPop: (req, res) => {
        const dbInstance = req.app.get('db')
        const {brand} = req.params

        dbInstance.sort_brand_popularity(brand)
        .then(shoe => res.status(200).send(shoe))
        .catch(err => {
            res.sendStatus(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
            console.log(err)
        })
    },

    sortBrandbyPriceHightoLow: (req, res) => {
        const dbInstance = req.app.get('db')
        const {brand} = req.params

        dbInstance.sort_brand_price_highlow(brand)
        .then(shoe => res.status(200).send(shoe))
        .catch(err => {
            res.sendStatus(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
            console.log(err)
        })
    },

    sortBrandbyPriceLowtoHigh: (req, res) => {
        const dbInstance = req.app.get('db')
        const {brand} = req.params

        dbInstance.sort_brand_price_lowhigh(brand)
        .then(shoe => res.status(200).send(shoe))
        .catch(err => {
            res.sendStatus(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
            console.log(err)
        })
    },

    sortBrandbyName: (req, res) => {
        const dbInstance = req.app.get('db')
        const {brand} = req.params

        dbInstance.sort_brand_name(brand)
        .then(shoe => res.status(200).send(shoe))
        .catch(err => {
            res.sendStatus(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
            console.log(err)
        })
    },

    create: (req, res) => {

        cart.push({
            id: req.body.id, 
            image: req.body.image,
            name : req.body.name,
            price: req.body.price,
            size: req.body.size,
            quant: req.body.quant,
            original_price: req.body.original_price
        })
        // id++
        res.status(200).send(cart)
    },

    getCart: (req, res) => {
        res.status(200).send(cart)
    },

    deleteItem: (req, res) => {
        const {id} = req.params
        let index2 = 0

        cart.map((element, i) => {
            if(element.id === +id){
                index2 = i
            }
        })

        cart.splice(index2, 1)
        res.status(200).send(cart)
    },

    updatePrice: (req, res) => {   //INCREASE DECREASE BUTTON OR HAVE ORIGINAL PRICE AND ADJUSTABLE PRICE 
        const {name} = req.params
        let {price} = req.body
        let {quant} = req.body
        const {original_price} = req.body
        const {image} = req.body
        const {size} = req.body
        const {id} = req.body

        let index = 0
        let price2 = price
        let quant2 = quant
        const price3 = original_price
        

        cart.map((element, i) => {
            if(element.name === name){
                price = original_price * quant
                quant2 = quant
                index = i
            }
        })

        let updateItem = {
            id: +id,
            image: image,
            name: name,
            original_price: original_price,
            price: price,
            quant: quant,
            size: size
        }

        // original_price = price3
        
        cart.splice(index, 1, updateItem)
        res.status(200).send(cart)
    }

}