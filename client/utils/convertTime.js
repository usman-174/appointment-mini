function convertToAMPM(time24) {
    if(time24?.length < 1){
        
        return "";
    }
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(":");
    
    // Convert hours to a number
    const hoursNum = parseInt(hours, 10);
    
    // Determine AM or PM
    const ampm = hoursNum >= 12 ? "PM" : "AM";
    
    // Convert to 12-hour format
    const hours12 = hoursNum % 12 || 12; // Handle 12-hour format
    
    // Format the time in AM/PM format
    const time12 = `${hours12}:${minutes} ${ampm}`;
    
    return time12;
  }

  export {convertToAMPM}