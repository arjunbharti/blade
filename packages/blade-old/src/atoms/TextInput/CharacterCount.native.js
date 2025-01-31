import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import Space from '../Space';
import Flex from '../Flex';
import View from '../View';

const styles = {
  color({ disabled }) {
    if (disabled) {
      return 'shade.940';
    } else {
      return 'shade.960';
    }
  },
};

const CharacterCount = ({ maxLength, currentLength, disabled }) => {
  return (
    <Space padding={[0.5, 0, 0, 1]}>
      <Flex flex={0}>
        <View>
          <Text
            maxLines={2}
            color={styles.color({
              disabled,
            })}
            size="xsmall"
          >
            {`${currentLength}/${maxLength}`}
          </Text>
        </View>
      </Flex>
    </Space>
  );
};

CharacterCount.propTypes = {
  maxLength: PropTypes.number,
  currentLength: PropTypes.number,
  disabled: PropTypes.bool,
};

CharacterCount.defaultProps = {
  maxLength: 10,
  currentLength: 0,
  disabled: false,
};

export default CharacterCount;
