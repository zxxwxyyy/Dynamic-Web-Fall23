import cx from 'classnames'
import { twMerge } from 'tailwind-merge'
import propTypes from 'prop-types'

Button.propTypes = {
    checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
        const count =
            Number(!!primary) +
            Number(!!secondary) +
            Number(!!success) +
            Number(!!warning) +
            Number(!!danger)
        if (count > 1) {
            return new Error(
                'only one of primary, secondary, success, warning or danger can be true'
            )
        }
    }
}

export default function Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    ...otherProps
}) {

    const classes = twMerge(cx(
        otherProps.className,
        'flex items-center px-8 py-3 border',
        {
            'border-blue-500 bg-blue-600 text-white': primary,
            'border-gray-900 bg-gray-800 text-white': secondary,
            'border-green-600 bg-green-800 text-white': success,
            'border-orange-400 bg-orange-500 text-white': warning,
            'border-red-500 bg-red-600 text-white': danger,
            // rounded variation
            'rounded-full': rounded,
            'bg-white': outline,
            // outline
            'text-blue-500': outline && primary,
            'text-gray-900': outline && secondary,
            'text-green-500': outline && success,
            'text-orange-400': outline && warning,
            'text-red-600': outline && danger,
        }))

    return <button
        {...otherProps}
        className={classes}>
        {children}
    </button>
}