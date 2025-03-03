import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const sendSurveyData = async (surveyData) => {
  try {
    const docRef = await addDoc(collection(db, "surveys"), surveyData);
    console.log("Survey data saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving survey:", e);
  }
};
