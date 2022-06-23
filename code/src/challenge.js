import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "./styles/Index.module.css";

const Challenge = () => {
  const [count, setCount] = useState(8);
  const [note, setNote] = useState({
    title: "",
    content: ""
  })
  const [notes, setNotes] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;

    setNote(previousNote => {
      return {
        ...previousNote,
        [name]: value
      }
    })
  }

  function addNote(e) {
    e.preventDefault();
    if (note.title !== "" || note.content) {
      setNotes((prevNotes) => {
        return [...prevNotes, note];
      });
    }
      setNote({ title: "", content: "" })

   }

  function deleteNote(i) {
    // console.log(i);
     const removeItem = notes.filter((note, index) => {
         return index !== i;
     });
     setNotes(removeItem);
  }


 function increment(e){
   e.preventDefault();
   setCount(count + 1)
 }

   function decrement(e) {
       e.preventDefault();
       setCount(count - 1);
   }

  if(count <= 8){
    decrement=()=>setCount(8)
  }
    return (
        <div className={styles.back}>
            <h1>{count}</h1>
             <Row gutter={[16, 16]}>
                        <Col lg={12} sm={12}><button className={styles.btn} onClick={increment}>
                +1
            </button></Col><Col lg={12} sm={12}>
            <button className={styles.btn} onClick={decrement}>
                -1
            </button></Col></Row>

            <div>
                <form action="">
                    <div className={styles.inputs}>
                        <label htmlFor="update_country">CREATE </label>
                        <div className={styles.transInfo}>
                            <Input
                                name="title"
                                value={note.title}
                                placeholder="Title"
                                onChange={handleChange}
                            />
                            <textarea
                                name="content"
                                value={note.content}
                                placeholder="Take note"
                                rows={4}
                  onChange={handleChange}

                  style={{width: "100%", borderRadius: "5px", marginTop: "10px"}}
                            />
                        </div>
                        <button className={styles.btn} onClick={addNote}>
                            Add Note
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.back}>
                {notes.map((note, i) => {
                    return (
                        <div key={i} id={i}>
                            <p>{note.title}</p>
                            <em>{note.content}</em>
                            <button onClick={()=>deleteNote(i)}>Delete</button>
                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Challenge;
