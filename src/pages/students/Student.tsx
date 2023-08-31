import { useState,useEffect } from "react";
import IStudent, { fetchAllStudent } from "../../models/student";
import {Link} from 'react-router-dom'
import Loading from "../../components/Loading";
import axios from "axios";

const Student = () => {

    const [students, setStudents] = useState<IStudent[]>([])
    const [loading,setLoading] = useState(true);
    useEffect( () => {
            
               
                          axios.get(`http://localhost:8000/api/v1/etudiants`).then(response => {
                                setStudents(response.data.etudiants);
                                setLoading(false);

                          });   
                
           
    },[])

    const deleteStudent = (e:any, id:number | null | undefined) => {

        e.preventDefault();
        const thisClicked = e.currentTarget;

        thisClicked.innerText = "Deleting ..."

        axios.delete(`http://localhost:8000/api/v1/etudiant/${id}/delete`).then(
            res =>{
                //alert(res.data.message)
                thisClicked.closest('tr').remove();

            }).catch( function (error){
                if(error.response){
                    if(error.response.status === 404){
                      console.log("404 " + error.response.data.message)
                        thisClicked.innerText = "Delete"
                      
                    }
           
                    if(error.response.status === 500){
                      console.log(error.response.data)
                      setLoading(false);
      
                    }
                  }
            })
        
    }

    if(loading){
        return (
            <Loading />
        )
    }
    return (
        <div className="content">
        <div className="container-fluid">
            <div className="card col-lg-10 offset-1 col-md-12">
                <div className="card-header">
                    <h2 className="col-lg-10 text-center col-md-12">Liste des Etudiants</h2>
                </div>

                <div className="card-body">
                    <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="dt-buttons btn-group flex-wrap">
                                    <Link to="/student/create"
                                    className="btn btn-primary">Ajouter un nouveau etudiant</Link>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="example1"
                                    className="table table-bordered table-striped dataTable dtr-inline"
                                    aria-describedby="example1_info">
                                    <thead>
                                        <tr>
                                            <th className="text-center" tabIndex={0} aria-controls="example1"
                                                rowSpan={1} colSpan={1} aria-sort="ascending"
                                                aria-label="Rendering engine: activate to sort column descending">
                                                Nom</th>
                                            <th className="text-center" tabIndex={0} aria-controls="example1"
                                                rowSpan={1} colSpan={1}
                                                aria-label="Browser: activate to sort column ascending">Prenom (s)</th>
                                            <th className="text-center" tabIndex={0} aria-controls="example1"
                                                rowSpan={1} colSpan={1}>
                                                Adresse</th>
                                            <th className="text-center" tabIndex={0} aria-controls="example1"
                                                rowSpan={1} colSpan={1}>
                                                Telephone</th>
                                            <th className="text-center" tabIndex={0} aria-controls="example1"
                                                rowSpan={1} colSpan={1}>
                                                Classe</th>
                                            <th className="text-center" tabIndex={0} aria-controls="example1"
                                                rowSpan={1}  >Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                        <tr className="" key={student.id}>
                                                <td className="text-center">{ student.nom }</td>
                                                <td className="text-center">{ student.prenom }</td>
                                                <td className="text-center">{ student.adresse }</td>
                                                <td className="text-center">{ student.telephone }</td>
                                                <td className="text-center">{ student.classe }</td>
                                                <td className="text-center">
                                                    <Link to={`/student/${student.id}/edit`}   className="btn btn-icon btn-primary"> Edit</Link>
                                                    <button  type="button" onClick={(e) => deleteStudent(e,student.id)} className="btn btn-icon btn-danger">Delete </button>
                                                </td>                                 
                                        </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mt-3">

                            <div className="col-sm-12"  >
                                {/* <Pagination :links="clients.links"/> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
}

export default Student;