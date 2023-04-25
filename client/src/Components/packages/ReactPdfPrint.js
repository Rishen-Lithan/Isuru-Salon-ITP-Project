import React,{ useRef} from "react";
import { useReactToPrint} from 'react-to-print';
import { useEffect,useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import Logo from '../../images/logo.jpg';

const ReactPdfPrint = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/Post/posts")
            .then((res) => {
                console.log(res)
                setPosts(res.data);
            })
            .catch((err) => console.log(err));
}, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'salon-packages',
        onAfterPrint: ()=> alert('Print success')
    });

    return (
        <>
        
            <div ref={componentRef} style={{width: '100%', height: '100%'}}>
            <div className="container mt-3  p-5 mt-4 rounded-3">
                <img src={Logo} style={{width:'20%', height:'20%', marginLeft:'0%'}}></img>
                <br /><br />
                    <h5>Isuru Salon</h5>
                    <br></br>
                    <h6>  225/2J</h6>
                    <h6>  High Level Road</h6>
                    <h6>  Homagama</h6>
            </div>
                <h1 className="text-center my-3 border py-2">Salon Packages</h1>
                <br />
                <Table className="w-75 mx-auto" bordered>
                    <thead>
                        <th>Package Title</th>
                        <th>Package Type</th>
                        <th>Services</th>
                        <th>Package Price</th>
                    </thead>
                    <tbody>
                    {posts ? (
                        <>
                            {posts.map((post) => {
                                return (
                                        <tr key={post._id} >
                                            <td>{post.title}</td>
                                            <td>{post.type}</td>
                                            <td>{post.description}</td>
                                            <td>Rs. {post.price}.00</td>
                                        </tr>
                                        );
                            })}
                        </>
                    ) : (
                     ""
                    )}
                    </tbody>
                </Table>
            </div>
            <br />
            <center>
                <button className="btn btn-secondary" style={{ borderRadius:"5px"}} onClick={handlePrint}>Download</button>
            </center>
            
        </>
    );
};

export default ReactPdfPrint;