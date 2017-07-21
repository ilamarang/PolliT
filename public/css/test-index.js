var names = [];

function formatNames(names) {
	if(names.length === 0) {
		throw new Error("No names in the array");
	} else if(names.length === 1) {
		return names[0];
	} else if (names.length === 2) {
		return names.join(" & ");
	} else {
		var lastName = names.pop();
		var result = names.join(" , ");
		return result + " & " + lastName;
	}
}

// keith, dan & chris