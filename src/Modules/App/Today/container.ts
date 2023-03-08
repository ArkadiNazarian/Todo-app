import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/firbase-config";

export const useContainer = () => {
    const collect = collection(db, "tasks");

    onSnapshot(collect, (snapshot) => {
        console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })


}