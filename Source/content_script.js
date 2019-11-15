walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function thousandTimes(m,p1,p2,p3,p4,oc,c)
{
	//p1 $ or \b
	//p2 amount including decimal
	//p3 amount after decimal point
	//p4 variation on "billion"
	var retVal = (p1 == '$') ? '$' : '';

	if (isNaN(p2))
	{
		retVal += p2 + ' thousand';
	} else
	{
		retVal += (1000 * parseFloat(p2));
	}
	switch (p4)
	{
		case 'BILLION':
			retVal += ' MILLION';
			break;
		case 'Billion':
			retVal += ' Million';
			break;
		case 'Bil':
			retVal += ' Mil';
			break;
		case 'bil':
			retVal += ' mil';
			break;
		case 'Bn':
			retVal += ' M';
			break;
		case 'bn':
			retVal += ' m';
			break;
		default:
			retVal += ' million';
			break;
	}
	return retVal;
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/(\b|\$)([0-9]+(\.[0-9]+)?) (BILLION|Billion|billion|Bil|Bn|bn)\b/g, thousandTimes);
	v = v.replace(/\bBILLIONAIRE(S)?\b/g, "THOUSAND-MILLIONAIRE$1");
	v = v.replace(/\bBillionaire(s)?\b/g, "Thousand-Millionaire$1");
	v = v.replace(/\bbillionaire(s)?\b/g, "thousand-millionaire$1");
	v = v.replace(/\bBILLION\b/g, "THOUSAND-MILLION");
	v = v.replace(/\bBillion\b/g, "Thousand-Million");
	v = v.replace(/\bbillion\b/g, "thousand-million");
	//v = v.replace(/\bbillion\b/g, "thousand million");
	
	textNode.nodeValue = v;
}


