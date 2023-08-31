import axios from "axios";
const API_URL = 'http://localhost:8000/api/v1';

export interface IStudent {
    id?: number | null;
    nom : string ;
    prenom:string ;
    adresse: string;
   telephone: string;
    classe_id: number | null;
    classe?: string;
    classe_libelle?: string;
}

export const fetchAllStudent = async () =>  {
    try {
        const response = await axios.get(`${API_URL}/etudiants`);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const fetchAllClasses = async () => {
    try {
        const response = await axios.get(`${API_URL}/classes`);
        return response.data;
    } catch (error) {
      console.log(error);
    }
  }

export const createStudent = async (data:IStudent) => {
    try {
        await axios.post(`${API_URL}/etudiant`,data).then( response => {
         alert( response.data.message)
        }).catch((error) => {
           if(error.response){
             if(error.response.status === 422){
               alert(error.response.data.errors)
             }
 
             if(error.response.status === 500){
               alert("580 " + error.response.data.errors)
             }
           }
        })
      
   } catch (error) { 
     console.log(error)
   }

}

export const editStudent = async (id:number) => {

    try {
        const response = await axios.get(`${API_URL}/etudiant/${id}/edit`);
        return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const updateStudent = async (data:IStudent) => {

  try {
    await axios.put(`${API_URL}/etudiant/${data.id}/edit`,data).then( response => {
     console.log( response.data.message)
    }).catch((error) => {
       if(error.response){
         if(error.response.status === 422){
           alert(error.response.data.errors)
         }

         if(error.response.status === 404){
           console.log("404 " + error.response.data.errors)
         }

         if(error.response.status === 500){
           console.log(error.response.data.message)
         }
       }
    })
  
} catch (error) { 
 console.log(error)
}
}



// class Student  {

//          id: number;
//          nom: string ;
//          prenom:string ;
//          adresse: string;
//          telephone: string;
//          classe_id: number | string;
//          classe: string;
//          classe_libelle: string;
   

// }


export default IStudent;