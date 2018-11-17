$(function() {
	function activeFiltersPluginViewModel(viewModels) {
		var self = this;
		
		self.terminal = viewModels[0];
		self.settings = viewModels[1];
		
		self.activeFilters = ko.observableArray();
		
		self.onBeforeBinding = function() {
			self.activeFilters(self.settings.settings.plugins.active_filters_extended.activeFilters());
		}
		
		self.onEventSettingsUpdated = function(payload) {
			self.activeFilters(self.settings.settings.plugins.active_filters_extended.activeFilters());
		}
		
		self.onAfterBinding = function () {
			//cleanup potential manually removed filters
			currentFilters = self.terminal.filters();
			savedValues = JSON.parse(localStorage.getItem('terminal.activeFilters'));
			cleanValues = _.filter(savedValues, function(value) {
					return currentFilters.some(function(e) { return e.regex == value; } );
			});
			localStorage.setItem('terminal.activeFilters', ko.toJSON(cleanValues));
			
			self.terminal.activeFilters = self.terminal.activeFilters.extend({ persist: { get: self.getData, set: self.setData } });
		}
		
		self.setData = function (value) {
			self.settings.settings.plugins.active_filters_extended.activeFilters(value);
			self.settings.saveData();
		}
		
		self.getData = function () {
			return self.activeFilters();
		}
	}

	OCTOPRINT_VIEWMODELS.push([
		activeFiltersPluginViewModel, 
		["terminalViewModel","settingsViewModel"],
		[]
	]);
});

