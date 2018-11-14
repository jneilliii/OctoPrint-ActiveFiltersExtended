$(function() {
	function activeFiltersPluginViewModel(viewModels) {
		var self = this;
		
		self.onAfterBinding = function () {
			terminal = viewModels[0];
			//cleanup potential manually removed filters
			currentFilters = terminal.filters();
			savedValues = JSON.parse(localStorage.getItem('terminal.activeFilters'));
			cleanValues = _.filter(savedValues, function(value) {
					return currentFilters.some(function(e) { return e.regex == value; } );
			});
			localStorage.setItem('terminal.activeFilters', ko.toJSON(cleanValues));
			
			terminal.activeFilters = terminal.activeFilters.extend({ persist: { local: "terminal.activeFilters" } });
		}
	}

	OCTOPRINT_VIEWMODELS.push([
		activeFiltersPluginViewModel, 
		["terminalViewModel"],[]
	]);
});

