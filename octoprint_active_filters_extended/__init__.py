import octoprint.plugin

class ActiveFiltersPlugin(octoprint.plugin.AssetPlugin,octoprint.plugin.SettingsPlugin):

	def get_assets(self):
		return dict(
			js=["js/knockout.observableStorage.js", "js/active_filters.js"]
		)
		
	##~~ SettingsPlugin mixin
	
	def get_settings_defaults(self):
		return dict(
			activeFilters = []
		)

	def get_version(self):
		return self._plugin_version

	def get_update_information(self):
		return dict(
			active_filters_extended=dict(
				displayName="Active Filters Extended",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-ActiveFiltersExtended",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-ActiveFiltersExtended/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Active Filters Extended"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = ActiveFiltersPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}


