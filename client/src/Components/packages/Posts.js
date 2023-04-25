import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './package.css';


function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [posts, setPosts] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');
console.log(search);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {
    axios.get("/api/Post/posts")
        .then((res) => {
            console.log(res)
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
}, []);

const deletePost = (id) => {
axios
.delete(`/api/Post/delete/${id}`)
.then((res) => console.log(res))
.catch((err) => console.log(err));

window.location.reload();
};

const updatePost = (post) => {
setUpdatedPost(post);
handleShow();
}

const handleChange = (e) => {
const { name, value} = e.target;

setUpdatedPost((prev) => {
    return {
        ...prev,
        [name]: value,
    };
});
};

const saveUpdatedPost = () => {
axios.put(`/api/Post/update/${updatedPost._id}`, updatedPost)
.then((res) => console.log(res))
.catch((err) => console.log(err));

handleClose();
window.location.reload();
};

//Sorting function
const [order, setOrder] = useState("ASC");
const sorting = (col) =>{
  if(order ==="ASC"){
    const sorted = [...posts].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setPosts(sorted);
        setOrder("DESC");
  }
  if(order ==="DESC"){
    const sorted = [...posts].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setPosts(sorted);
        setOrder("ASC");
    }
  };



return (
    <div className="packages">
    <div>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update a Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control 
                            style={{marginBottom: "1rem"}}
                            placeholder="title"
                            name="title"
                            value={updatedPost.title ? updatedPost.title : ""}
                            onChange={handleChange}/>
                        <Form.Control 
                            style={{marginBottom: "1rem"}}
                            placeholder="type"
                            name="type"
                            value={updatedPost.type ? updatedPost.type : ""}
                            onChange={handleChange}/>
                        <Form.Control 
                            style={{marginBottom: "1rem"}}
                            placeholder="description"
                            name="description"
                            value={updatedPost.description ? updatedPost.description : ""}
                            onChange={handleChange}/>
                        <Form.Control 
                            style={{marginBottom: "1rem"}}
                            placeholder="price"
                            name="price"
                            value={updatedPost.price ? updatedPost.price : ""}
                            onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={handleClose}>
                    Close
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%", width:"30%"}} onClick={saveUpdatedPost}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>

        {posts ? (
            
            <>
            
            <Form>
                <InputGroup className="my-3" style={{width:"20%", marginLeft:"75%"}}>
                    <Form.Control 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search here"/>
                </InputGroup>
            </Form>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}}><Link to="/posts/create" style={{color:"white", textDecoration:"none"}}>Create New Package</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}}><Link to="/posts/report" style={{color:"white", textDecoration:"none"}}>Download Package Menu</Link></button>
            
                <br /><br />
                <center>
                    <h1 style={{color:"black", fontWeight:"bold"}}>Packages Page</h1>
                </center>

                <div className="container">
                <button onClick={() => sorting("type")}>Sort by Type</button>&nbsp;
                <button onClick={() => sorting("price")}>Sort by Price</button>
                </div>
                    
                        {posts.filter((post) => {
                            return search.toLowerCase() === ''
                                ? post
                                : post.title.toLowerCase().includes(search) ||
                                  post.type.toLowerCase().includes(search) ||
                                  post.description.toLowerCase().includes(search)
                        })
                        .map((post) => {
                    return (

                        
                            <div key={post._id} className = "package-preview" >
                                <center>
                                    <h2>{post.title}</h2>
                                    <p>{post.type}</p>
                                    <p>{post.description}</p>
                                    <p>Rs. {post.price}.00</p>
                                        <button style={{color:"white", background:"#3d3c3c", border:"black"}} onClick={() => updatePost(post)}>UPDATE</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button onClick={() => deletePost(post._id)}>DELETE</button><br />
                                    
                                </center>
                            </div>
                        
                          
                    );
                })}
            </>
        ) : (
          ""
        )}
    </div>
    </div>
);
}


export default App;
