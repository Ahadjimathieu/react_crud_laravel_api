import React , {useEffect,useState,ChangeEvent} from 'react'
import { createStudent, fetchAllClasses, IStudent } from '../../models/student';
import {IClasse} from '../../models/classe'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
const AddStudent = () => {
    const [classes, setClasses] = useState([] as IClasse[]);
    const [student, setStudent] = useState({} as IStudent)
    const [loading, setLoading] = useState(true);
    const [classe_id, setClasseId] = useState<number | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        const getAllClasses = async ()=> {

            try {
                const allClasses = await fetchAllClasses();
                setClasses(allClasses.classes);
            } catch (error) {
                console.log(error)
            }
        }

        getAllClasses();
    },[])
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        setClasseId(selectedId);
        
      };
    const handleChange = (e:any) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const saveStudent = (e:any) => {
        e.preventDefault();
        //setLoading(true);
        const data:IStudent = {
            nom: student.nom,
            prenom: student.prenom,
            adresse: student.adresse,
            telephone: student.telephone,
            classe_id: classe_id,
           
        }
        setStudent({...data,classe_id})
        
        axios.post(`http://localhost:8000/api/v1/etudiant`, data).then(res => {
                 
                 alert(res.data.message)
                navigate('/students')

                 setLoading(false)
         }).catch((error) => {
            if(error.response){
              if(error.response.status === 404){
                console.log("404 " + error.response.data.message)
                setLoading(false);
              }
     
              if(error.response.status === 500){
                console.log(error.response.data)
                setLoading(false);

              }
            }
         })


        // createStudent(data);
        

       
    }
    return (
        <div className="container-fluid mt-5">
            <div className="card col-lg-10 offset-1 col-md-12">
                <div className='m-5'>
                    <h3>Enregistrement d'un nouveau client</h3>
                    <div className="d-flex mb-2">
                        <h2 className="card-title flex-grow-1"> </h2>
                    </div>
                    <form className="row g-3" onSubmit={saveStudent}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nom :</label>
                            <input type="text" className="form-control" name='nom' value={student.nom} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Prenom :</label>
                            <input type="text" className="form-control" name='prenom' value={student.prenom} onChange={handleChange}  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Adresse :</label>
                            <input type="text" className="form-control"  name='adresse' value={student.adresse}  onChange={handleChange}  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Telephone</label>
                            <input type="text" className="form-control" name='telephone' value={student.telephone} onChange={handleChange}  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Classe</label>
                            <select className="form-select form-select-lg mb-3" value={classe_id !== null ? classe_id: ''}  onChange={handleSelectChange} aria-label="Large select example">
                                <option value=""  > Choisissez la classe</option>
                                {
                                    classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>{classe.libelle}</option>
                                    ))
                                }
                             </select>
                        </div>
                        <div className="card-footer">
                           <Link to="/students" className="btn btn-danger">Back</Link>
                           <button type='submit' className="btn btn-success float-end">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddStudent
