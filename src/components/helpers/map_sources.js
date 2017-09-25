const mapSources = (sources) => {
	let sourceStr = '';
	sources.map((source) => {
		sourceStr += source.id+","
	});
    return sourceStr.slice(0, -1);
}
 export default mapSources;