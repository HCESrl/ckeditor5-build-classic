import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LineHeightCommand from './line-height-command';

import { normalizeOptions } from './utils';

const LINE_HEIGHT = 'lineHeight';

export default class LineHeightEditing extends Plugin {
	constructor( editor ) {
		super( editor );

		// Define default configuration using named presets.
		editor.config.define( LINE_HEIGHT, {
			options: [
				'default', 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5
			]
		} );

		const definition = {
			model: {
				key: LINE_HEIGHT,
				values: []
			},
			view: {},
			upcastAlso: {}
		};

		const options = normalizeOptions( this.editor.config.get( 'lineHeight.options' ) ).filter( item => item.model );

		for ( const option of options ) {
			definition.model.values.push( option.model );
			definition.view[ option.model ] = option.view;

			if ( option.upcastAlso ) {
				definition.upcastAlso[ option.model ] = option.upcastAlso;
			}
		}

		editor.conversion.attributeToElement( definition );

		editor.commands.add( LINE_HEIGHT, new LineHeightCommand( editor, LINE_HEIGHT ) );
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend( '$text', { allowAttributes: LINE_HEIGHT } );
	}
}
