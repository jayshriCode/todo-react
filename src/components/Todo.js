import React, { useEffect, useState } from 'react'
import "./style.css"

const Todo = () => {

    const getLocalData = () => {
        const lists = localStorage.getItem("myTodoList");
        if (lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    }

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [isToggleBtn, setIsToggleBtn] = useState(false);

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items])

    const addItem = (inputData) => {
        if (!inputData) {
            alert("Please fill in the input");
        }
        else if (inputData && isToggleBtn) {
            const updatedItems = items.map((curElem)=>{
                if(curElem.id === isEditItem){
                    return {...curElem, name:inputData};
                }else{
                    return curElem;
                }
            })
           
            setItems(updatedItems);
            setIsToggleBtn(false);
            setInputData("");
            setIsEditItem(null);
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData]);
            setInputData("");
        }

    }

    const editItem = (editId) => {
        const item_tobe_edited = items.find((curElem) => {
            return curElem.id === editId;
        })
        setInputData(item_tobe_edited.name);
        setIsEditItem(editId);
        setIsToggleBtn(true);

    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((item) => {
            return item.id !== id
        })
        setItems(updatedItems);
    }

    const removeAll = () => {
        setItems([]);
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/icons8-list-58.png" alt="todo-logo" />
                        <figcaption>Add Your List Here 👌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍️ Add Items' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        {
                            isToggleBtn ? <i className="far fa-edit add-btn" onClick={() => addItem(inputData)}></i> : <i className="fa fa-plus add-btn" onClick={() => addItem(inputData)}></i>
                        }

                    </div>
                    {/* Show our Items */}
                    <div className="showItems">
                        {
                            items.map((item) => {
                                return (
                                    <div className="eachItem" key={item.id}>
                                        <h3>{item.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(item.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(item.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    {/* Remove All button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
