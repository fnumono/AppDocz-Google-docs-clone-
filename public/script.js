window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');   

    var previousMarkdownValue;

    pad.addEventListener('keydown', function(e){
    	if (e.keyCode === 9){
    		var start = this.selectionStart;
    		var end = this.selectionEnd;

    		var target = e.target;
    		var value = target.value;

    		target.value = value.substring(0, start)
                            + "\t"
                            + value.substring(end);

             this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            e.preventDefault();
    	}
    });

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function(){
    	if (previousMarkdownValue != pad.value)
    	{
    		return true;
    	}
    	return false;
    };

    setInterval(function(){
    	if (didChangeOccur()){
    		convertTextAreaToMarkdown();
    	}
    },1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    sharejs.open(document.location.pathname, 'text', function(error, doc){
    	doc.attach_textarea(pad);
    	convertTextAreaToMarkdown();
    });
};