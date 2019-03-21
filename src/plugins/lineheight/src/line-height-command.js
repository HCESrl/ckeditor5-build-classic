import Command from '@ckeditor/ckeditor5-core/src/command';

export default class LineHeightCommand extends Command {
	constructor( editor, attributeKey ) {
		super( editor );

		this.attributeKey = attributeKey;
	}

	/**
	 * @inheritDoc
	 */
	refresh() {
		const model = this.editor.model;
		const doc = model.document;

		this.value = doc.selection.getAttribute( this.attributeKey );
		this.isEnabled = model.schema.checkAttributeInSelection( doc.selection, this.attributeKey );
	}

	execute( options = {} ) {
		const model = this.editor.model;
		const doc = model.document;
		const selection = doc.selection;

		const value = options.value;

		model.change( writer => {
			if ( selection.isCollapsed ) {
				if ( value ) {
					writer.setSelectionAttribute( this.attributeKey, value );
				} else {
					writer.removeSelectionAttribute( this.attributeKey );
				}
			} else {
				const ranges = model.schema.getValidRanges( selection.getRanges(), this.attributeKey );

				for ( const range of ranges ) {
					if ( value ) {
						writer.setAttribute( this.attributeKey, value, range );
					} else {
						writer.removeAttribute( this.attributeKey, range );
					}
				}
			}
		} );
	}
}
