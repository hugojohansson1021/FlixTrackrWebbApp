"use client"
import { User } from "@/utils/types/user"
import React, { ChangeEvent, FormEvent, useState } from "react"
 
export default function Page() {
 const [formData, setFormData] = useState<User>({
   name: "Benny",
   email: "benny1123@hotmail.com",
   age: 5,
 })
 
 const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
   setFormData({
     ...formData,
     [event.target.name]:
       event.target.type === "number"
         ? parseFloat(event.target.value)
         : event.target.value,
   })
 }
 
 const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  try {
    const response = await fetch("./api/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      // Om svaret inte är ok, antar vi att det är ett felmeddelande i JSON-format
      const error = await response.json();
      console.error('Error response:', error);
    }
  } catch (error) {
    // Logga nätverks- eller parsingfel
    console.error('Network or parsing error:', error);
  }
};

 
 return (
   <form onSubmit={handleSubmit}>
     <label htmlFor="name">Name:</label>
     <input
       type="text"
       id="name"
       name="name"
       placeholder="name"
       value={formData.name}
       onChange={handleChange}
       required
     />
 
     <label htmlFor="email">Email:</label>
     <input
       type="email"
       id="email"
       name="email"
       placeholder="email"
       value={formData.email}
       onChange={handleChange}
       required
     />
 
     <label htmlFor="age">Age:</label>
     <input
       type="number"
       id="age"
       name="age"
       placeholder="12"
       value={formData.age}
       onChange={handleChange}
       required
     />
 
     <button type="submit">Submit</button>
   </form>
 )
}
 