var del = document.getElementById('delete')
var buttonColor = document.getElementsByClassName("change")

Array.from(buttonColor).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
        console.log(name)
        fetch('changeColor', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "name": name
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

del.addEventListener('click', function() {
  fetch('quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    })
    .then(res => {
      if (res.ok) return res.json()
      console.log()
    }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})
