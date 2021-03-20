const comparedatecurr=(d1)=>{
      const date=new Date(d1);
      const date2=new Date();
      if (date2.getFullYear()>date.getFullYear()){
            return 1;
      }else if (date2.getFullYear()==date.getFullYear()){
            if (date2.getMonth()>date.getMonth()){
                  return 1;
            }
            else if (date2.getMonth()==date.getMonth()){
                  if (date2.getDate()>date.getDate()){
                        return 1;
                  }
                  else if (date2.getDate()==date.getDate()){
                        return 2;
                  }
            }
      }
      return 0;
}

// console.log(comparedatecurr("2021-3-20"));
const retobj=(allappointments)=>{
      const obj={
            Product:allappointments.Product_Name,
            Unit:allappointments.Unit,
            Price_Per_Unit:allappointments.Cost_per_Unit,
            StartDate:allappointments.StartDate,
            EndDate:allappointments.EndDate,
            Total_Quantity:allappointments.Total_Quantity_required,
            Total_Cost:allappointments.Total_Quantity_required*allappointments.Cost_per_Unit,           
            Mode_Of_Delivery:allappointments.ModeofDelivery,
            Vendor:allappointments.Vendor,
            Vendor_Address:allappointments.Vendor_Address
      }
      return obj;
}; 

const retobj1=(allappointments)=>{
      const obj={
            Product:allappointments.Product_Name,
            Unit:allappointments.Unit,
            Price_Per_Unit:allappointments.Cost_per_Unit,
            StartDate:allappointments.StartDate,
            EndDate:allappointments.EndDate,
            Total_Quantity:allappointments.Total_Quantity_required,
            Total_Cost:allappointments.Total_Quantity_required*allappointments.Cost_per_Unit,           
            Mode_Of_Delivery:allappointments.ModeofDelivery,
            Manufacturer:allappointments.Manufacturer,
            Manufacturer_Address:allappointments.Manufacturer_Address
      }
      return obj;
}; 

const retobj2=(allrfp,buttona)=>{
      const obj={
            Rfp_id:allrfp._id,
            Product:allrfp.Product_Name,
            Unit:allrfp.Unit,
            Price_Per_Unit:allrfp.Cost_per_Unit,
            StartDate:allrfp.StartDate,
            EndDate:allrfp.EndDate,
            Total_Quantity:allrfp.Total_Quantity_required,
            Mode_Of_Delivery:allrfp.ModeofDelivery,
            flag:buttona,
            DeadlineDate:allrfp.DeadlineDate
      }
      return obj;
}; 

const retobj3=(allrfp,buttona)=>{
      const obj={
            Rfp_id:allrfp._id,
            Product:allrfp.Product_Name,
            Unit:allrfp.Unit,
            Price_Per_Unit:allrfp.Cost_per_Unit,
            StartDate:allrfp.StartDate,
            EndDate:allrfp.EndDate,
            Total_Quantity:allrfp.Total_Quantity_required,
            Mode_Of_Delivery:allrfp.ModeofDelivery,
            flag:buttona
      }
      return obj;
}; 

module.exports={comparedatecurr,retobj,retobj1,retobj2,retobj3};