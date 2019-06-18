function main() {
    console.log("main function");
    console.log("ajax request to the resource which will require cors enabled");
    $.ajax
    ({

        dataType: "json",
        url: "http://localhost:4000/category",
        success: function (data) {
            document.write(JSON.stringify(data));
            console.log("log response on success");
            console.log(data);

        }
    });
}