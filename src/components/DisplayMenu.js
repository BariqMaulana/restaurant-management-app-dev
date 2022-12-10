import { useState, useEffect } from "react"
import { ref, onValue, set } from "firebase/database"
import { db } from "../database/firebase"
import ListGroup from 'react-bootstrap/ListGroup'
import { Container } from "react-bootstrap"

function DisplayMenu(props) {

    const [selectedFood, setSelectedFood] = useState([])
    const [selectedReceipt, setSelectedReceipt] = useState([])

    var order_foods = []
    
    useEffect(() => {
        Object.entries(props.receipts).map((receipt) =>{
            if(receipt[1].table_id == props.activeTable.id){
                var data = receipt[1]
                setSelectedReceipt(data)
                setSelectedFood(data.ordered_foods)
            }
        })
    }, [])

    Object.entries(props.foods).map((food) => {
        Object.entries(selectedFood).map((sFood) =>{
            if(food[1].id == sFood[1]) {
                order_foods.push(food[1])
            }
        })
    })
  

    var confirm_order_foods = () => {
        // set(ref(db, "receipts/" + selectedReceipt.id + "/ordered_foods"), order_foods)
        console.log(selectedReceipt.id)
    }

    if(props.isPopUp) {
        return (
            <>
            <Container className="bg-white text-center rounded">
            {Object.entries(props.foods).map((food, i) => {
                return (
                    <ListGroup key={food[1].id}>
                    <ListGroup.Item action onClick={confirm_order_foods}>
                      {food[1].name}
                    </ListGroup.Item>
                  </ListGroup>
                )
            })}
            </Container>
            </>
          )
    } else {
        return  (
            <></>
        )
    }

}

export default DisplayMenu