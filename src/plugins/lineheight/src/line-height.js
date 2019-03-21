import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LineHeightEditing from './line-height-editing';
import LineHeightUi from './line-height-ui';

/**
 * LineHeight plugin
 */
export default class LineHeight extends Plugin {
	/**
     * @inheritDoc
     */
	static get pluginName() {
		return 'LineHeight';
	}

	/**
     * @inheritDoc
     */
	static get requires() {
		return [ LineHeightEditing, LineHeightUi ];
	}
}
