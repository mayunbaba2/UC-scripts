// add about:config search-engine to search-bar
// 新增 about:config 搜尋引擎到搜尋列
(function(){
  let engineName = "AboutConfig设置";
  let nsIBS = Ci.nsIBrowserSearchService;
  let ss = Cc["@mozilla.org/browser/search-service;1"].getService(nsIBS);
  let engine = ss.getEngineByName(engineName);
  if (!engine) {
    ss.addEngineWithDetails(
      engineName,
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90EAQUCFAFvEOAAAAQbSURBVDgRARAE7/sBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgYGBETg4OHsAAAAAyMjIhX9/f+8AAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAACIiIgcNjY2nv////nExMSWERERcwAAAAABAQG9sbGxagwMDAfJyclienp65AAAAAAAAAAABAAAAAAAAAAAAAAAABMTE44WFhZF////ADc3NyMJCQkAAAAAADQ0NI0dHR0pAgICAAkJCY4AAABWAAAAAAAAAAACAAAAAH5+fh67u7uTj4+PrgICAgAJCQn/KSkpKfn5+QD5+fkAKysrKQkJCf8AAAAAoKCgrsrKypOAgIAeAAAAAAEAAAAAzMzMvxoaGkD4+PgACwsL/9zc3AHPz88ABgYGAAAAAAD6+voAMTExACQkJP/4+PgBBAQEAOfn58A0NDRBBAAAAATGxsYVXFxcAAgICADg4eEB29vbAO3t7eC6urqcAAAAAEZGRmPa2tohCgoKAR8fHwAAAAAAxcXFFQAAAAQBc3NzDv39/T5DQ0OZRkZGGrGxsf/x8fH0ZWVlKAAAAOYAAAAAAAAAGZubm9kPDw8MT09PAbq6uua+vr5nAgICwgRNTU2MLi4uZQgICAD4+PkAAwMDAfPz88AAAADmAAAAAAAAAAAAAADn9PT0wBISEk34+PgAQ0NDGjs7O7PS0tKbBOTk5AMHBwcABAQEAAsMDAAKCgoAHBwcDgAAAAAAAAAAAAAAAAAAAAAbGxsOCgoKAObm5wD09PMA/Pz8AOTk5AMDycnJ4cTExN8eHh4sEhISDQoKCgASEhIgGRkZu8HBweMAAAAAf39/Ojg4OIIJCgoA/fz8AM7OzueHh4eErq6upgEAAAAAsLCwsAICAk8ICAgAEBESAAQDAv8JCQkB+vr6zQAAAAAGBgYz9/f3//3+/gHw7+8A9/f3AO7u7rFgYGBQBAAAAAPPz88jIiIiAAcHBwD39/f/EBARAQUGBgAHBwgzAAAAAPv8+wDz9PQB8fDw//f39wH5+fkA39/fIwAAAAMDAAAA/+zs7Nf+/v4kn5+fnTY2NkH19fUA7ezsAO7u7QDr6+sA6ujoAPLy8gDz8/MBd3d3fwgICAW4uLh16+vr3wEAAAAACgoKAPb29gCJiYmcBgYGYwYGBgDf39/uJiYmEgEBAQDZ2dnuIiIiEvr6+gDo6OidiIiIZAsLCwD19fUAAwAAAAD7+/sAAAAAAODg4PgQEBA77e3t48nJyYMgICBP+Pj4ALq6umwEBAQh7Ozs9bS0tIru7u7d+/v7AAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAEJSUlETY2NpgAAAAAysrKaNvb2+8AAAD8AAAA8gAAAAAAAAAAAAAAAJMEYjcaUf3RAAAAAElFTkSuQmCC",
      "",
      "aboutConfig",
      "GET",
      "https://duckduckgo.com/?q={searchTerms}"
    );
    engine = ss.getEngineByName(engineName);
  }

  engine = engine.wrappedJSObject;
  engine.getSubmission = function(aData, aResponseType) {
    let url = 'about:config?filter=' + aData;
    let submission = {uri:{spec:url}, postData:null};
    return submission;
  }
})();