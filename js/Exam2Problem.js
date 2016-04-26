function SelectSection()
{
    if (document.getElementById("selection").value == "Display Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
     }
     
     else if (document.getElementById("selection").value == "Add Product Category")
     {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
     }
     else if (document.getElementById("selection").value == "Update Category Description")
     {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
     }
     
     else if (document.getElementById("selection").value == "Delete Category")
     {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
     }
     
      else if (document.getElementById("selection").value == "Display About")
      {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
     }
     
     else
     {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
      
     }
}




function getCategory()
{
    var XMLobjrequest1 = new XMLHttpRequest();
    var allCatUrl = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    //Checks that the object has returned data 
    XMLobjrequest1.onreadystatechange = function() 
    { 
        if (XMLobjrequest1.readyState == 4 && XMLobjrequest1.status == 200) 
        { 
            var allCatOutput = JSON.parse(XMLobjrequest1.responseText); 
            GenerateAllCategories(allCatOutput); 
        } 
    } 
     
     
    //Initiate the server request 
    XMLobjrequest1.open("GET", allCatUrl, true); 
    XMLobjrequest1.send(); 
}

function GenerateAllCategories(result) 
{ 
    var count = 0; 
    var displayCatText = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";  //Create a table header ; 
     
    //Loop to extract data from the response object 
    for (count = 0; count < result.GetAllCategoriesResult.length; count++) 
    { 
       
       displayCatText += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>"; 
    } 
     
    document.getElementById("labelCategory").innerHTML = displayCatText;
    displayCatText += "</table>"; 
} 

function CreateCategory()
{
    var XMLobjrequest2 = new XMLHttpRequest();
    var createCatURL = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Gather data
    
    var categoryName = document.getElementById("catName").value;
    var categoryDescr = document.getElementById("catDescript").value;
    
    //Create new category string
    
    var newCategory = '{"CName":"' + categoryName + '","CDescription":"' + categoryDescr +'"}';
    
    XMLobjrequest2.onreadystatechange = function()
    {
        if (XMLobjrequest2.readyState == 4 && XMLobjrequest2.status == 200)
        {
            var createResult = JSON.parse(XMLobjrequest2.responseText)
            OperationResult(createResult);
        }
    }
    
    //Start AJAX request
    XMLobjrequest2.open("POST",createCatURL,true);
    XMLobjrequest2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLobjrequest2.send(newCategory);
    
}


function OperationResult(output)
{
     if (output.WasSuccessful == 1)
    {
        document.getElementById("catResultLabel").innerHTML = "The operation was successful!";
    }
    
    else
    {
        document.getElementById("catResultLabel").innerHTML = "The operation was NOT successful." + "<br>" + output.Exception;
    }
}

function UpdateDescription()
{
    var XMLobjrequest3 = new XMLHttpRequest();
    var updateURL = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect New Description
    
    var categoryID = document.getElementById("catID").value;
    var Description = document.getElementById("updatedescrlabel").value;
    
    //Create new Description string
    
    var newDescription = '{"CID":"' + categoryID + '","CDescription":"' + Description +'"}';
    
     XMLobjrequest3.onreadystatechange = function()
    {
        if (XMLobjrequest3.readyState == 4 && XMLobjrequest3.status == 200)
        {
            var updateResult = JSON.parse(XMLobjrequest3.responseText)
            updateOperationResult(updateResult);
        }
    }
    
    
    //Start AJAX request
    XMLobjrequest3.open("POST",updateURL,true);
    XMLobjrequest3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLobjrequest3.send(newDescription);
}

function updateOperationResult(output)
{
        if (output.WasSuccessful == 1)
    {
        document.getElementById("updateResultlabel").innerHTML = "The operation was successful!";
    }
    
    else
    {
        document.getElementById("updateResultlabel").innerHTML = "The operation was NOT successful." + "<br>" + output.Exception;
    }

}

function DeleteCategory()
{
     var XMLobjRequest4 = new XMLHttpRequest();
  var deleteURL = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
  deleteURL += document.getElementById("delCatID").value;
  confirm("Are you sure you want to delete this?");
  
  
     //Checks that the object has returned data 
    XMLobjRequest4.onreadystatechange = function() 
    { 
        if (XMLobjRequest4.readyState == 4 && XMLobjRequest4.status == 200) 
        { 
            var deleteResult = JSON.parse(XMLobjRequest4.responseText); 
            deleteOperationResult(deleteResult); 
        }
        
    }
    
    //Initiate the server request 
    XMLobjRequest4.open("GET", deleteURL, true);
    XMLobjRequest4.send();
    
    
}


    function deleteOperationResult(output)
    {
    
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("deleteResult").innerHTML = "The operation was successful!"
    }
    
    else
    {
        document.getElementById("deleteResult").innerHTML = "The operation was NOT successful." + "<br>" + output.Exception;
    }
    
    }
