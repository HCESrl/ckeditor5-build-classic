export function normalizeOptions( configuredOptions ) {
	// Convert options to objects.
	return configuredOptions
		.map( getOptionDefinition )
		// Filter out undefined values that `getOptionDefinition` might return.
		.filter( option => !!option );
}

function getOptionDefinition( option ) {
	// 'Default' line-height. It will be used to remove the fontSize attribute.
	if ( option === 'default' ) {
		return {
			model: undefined,
			title: 'Default'
		};
	}

	// At this stage we probably have numerical value to generate a preset so parse it's value.
	const sizePreset = parseFloat( option );

	// Discard any faulty values.
	if ( isNaN( sizePreset ) ) {
		return;
	}

	// Return font size definition from size value.
	return generatePixelPreset( sizePreset );
}

function generatePixelPreset( size ) {
	return {
		title: String( size ),
		model: size,
		view: {
			name: 'span',
			styles: {
				'line-height': size
			},
			priority: 5
		}
	};
}
