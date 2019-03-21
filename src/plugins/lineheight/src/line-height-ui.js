import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { normalizeOptions } from './utils';

import lineHeightIcon from '../theme/line-height.svg';

const LINE_HEIGHT = 'lineHeight';

/**
 * LineHeight ui plugin
 */
export default class LineHeightUi extends Plugin {
	init() {
		const editor = this.editor;

		const options = normalizeOptions( editor.config.get( 'lineHeight.options' ) );

		const command = editor.commands.get( LINE_HEIGHT );

		editor.ui.componentFactory.add( LINE_HEIGHT, locale => {
			const dropdownView = createDropdown( locale );
			addListToDropdown( dropdownView, _prepareListOptions( options, command ) );

			dropdownView.buttonView.set( {
				label: 'Line height',
				icon: lineHeightIcon,
				tooltip: true
			} );

			dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ck-line-height-dropdown'
					]
				}
			} );

			dropdownView.bind( 'isEnabled' ).to( command );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( evt.source.commandName, { value: evt.source.commandParam } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}
}

function _prepareListOptions( options, command ) {
	const itemDefinitions = new Collection();

	for ( const option of options ) {
		const def = {
			type: 'button',
			model: new Model( {
				commandName: LINE_HEIGHT,
				commandParam: option.model,
				label: option.title,
				class: 'ck-lineheight-option',
				withText: true
			} )
		};

		def.model.bind( 'isOn' ).to( command, 'value', value => value === option.model );

		itemDefinitions.add( def );
	}

	return itemDefinitions;
}
