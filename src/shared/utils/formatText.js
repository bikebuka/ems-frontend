export function ucFirst(str) {
   if (str.length>0) {
       return str.charAt(0).toUpperCase() + str.slice(1)
   }
   else{
       return "N/A"
   }
}