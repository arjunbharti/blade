import React from 'react';
import { CheckboxGroupProvider } from './CheckboxGroupContext';
import { useCheckboxGroup } from './useCheckboxGroup';
import { FormLabel, FormHint } from '~components/Form';
import Box from '~components/Box';
import { SelectorGroupField } from '~components/Form/Selector/SelectorGroupField';

type CheckboxGroupProps = {
  /**
   * Accepts multiple checkboxes as children
   */
  children: React.ReactNode;
  /**
   * Help text of the checkbox group
   */
  helpText?: string;
  /**
   * Error text of the checkbox group
   * Renders when `validationState` is set to 'error'
   *
   * Overrides helpText
   */
  errorText?: string;
  /**
   * Sets the error state of the CheckboxGroup
   * If set to `error` it will render the `errorText` of the group,
   * and propagate `invalid` prop to every checkbox
   */
  validationState?: 'error' | 'none';
  /**
   * Renders a necessity indicator after CheckboxGroup label
   *
   * If set to `undefined` it renders nothing.
   */
  necessityIndicator?: 'required' | 'optional' | 'none';
  /**
   * Sets the disabled state of the CheckboxGroup
   * If set to `true` it propagate down to all the checkboxes
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Renders the label of the checkbox group
   */
  label: string;
  /**
   * Sets the position of the label
   *
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  /**
   * Initial value of the checkbox group
   */
  defaultValue?: string[];
  /**
   * value of the checkbox group
   *
   * Use `onChange` to update its value
   */
  value?: string[];
  /**
   * The callback invoked when any of the checkbox's state changes
   */
  onChange?: ({ name, values }: { name: string; values: string[] }) => void;
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string;
};

const CheckboxGroup = ({
  children,
  label,
  helpText,
  isDisabled,
  necessityIndicator = 'none',
  labelPosition = 'top',
  validationState,
  errorText,
  name,
  defaultValue,
  onChange,
  value,
}: CheckboxGroupProps): React.ReactElement => {
  const { contextValue, ids } = useCheckboxGroup({
    defaultValue,
    onChange,
    value,
    isDisabled,
    name,
    labelPosition,
    validationState,
  });

  const showError = validationState === 'error' && errorText;
  const showHelpText = !showError && helpText;
  const accessibilityText = `,${showError ? errorText : ''} ${showHelpText ? helpText : ''}`;

  return (
    <CheckboxGroupProvider value={contextValue}>
      <SelectorGroupField position={labelPosition} labelledBy={ids.labelId}>
        <FormLabel
          as="span"
          necessityIndicator={necessityIndicator}
          position={labelPosition}
          id={ids.labelId}
          accessibilityText={accessibilityText}
        >
          {label}
        </FormLabel>
        <Box>
          <Box display="flex" flexDirection="column" gap={2}>
            {children}
          </Box>
          <FormHint
            errorText={errorText}
            helpText={helpText}
            type={validationState === 'error' ? 'error' : 'help'}
          />
        </Box>
      </SelectorGroupField>
    </CheckboxGroupProvider>
  );
};

export { CheckboxGroup, CheckboxGroupProps };
