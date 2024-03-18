// import { Animated, StyleSheet, Text } from 'react-native';
// import React, { useEffect, useRef } from 'react';

// import { RootState } from '~/store';
// import { useAppDispatch, useAppSelector } from '~/store/hooks';
// import { hideToast } from '~/store/slices/ToastSlice';

// const SuccessToast = ({
//   message,
//   testID,
//   textStyle,
//   wrapperStyle,
// }: IAnimatedToast) => (
//   <View style={[styles.toastView, wrapperStyle]}>
//     <TickIconGreen height={18} width={18} />
//     <Text
//       style={[styles.toastText, textStyle]}
//       accessible
//       testID={`${accessibilityTestID.animatedToast.toastMessage}_${testID}`}
//       accessibilityLabel={`${accessibilityTestID.animatedToast.toastMessage}_${testID}`}>
//       {message}
//     </Text>
//   </View>
// );

// const WarningToast = ({
//   message,
//   testID,
//   wrapperStyle,
//   textStyle,
//   showCloseButton = true,
// }: IAnimatedToast) => (
//   <View style={[styles.toastView, styles.warningToastContainer, wrapperStyle]}>
//     <WarningTriangle />
//     <Text
//       style={[styles.toastText, styles.warningText, textStyle]}
//       testID={`${accessibilityTestID.animatedToast.toastMessage}_${testID}`}
//       accessibilityLabel={`${accessibilityTestID.animatedToast.toastMessage}_${testID}`}>
//       {message}
//     </Text>
//     <If condition={showCloseButton}>
//       <Pressable onPress={Toast.hide} hitSlop={ICON_BUTTON_HITSLOP}>
//         <CloseIconSmall
//           width={ms(16)}
//           height={ms(16)}
//           style={styles.closeIcon}
//         />
//       </Pressable>
//     </If>
//   </View>
// );

// export const ErrorToast = ({
//   message,
//   testID,
//   showCloseButton = true,
//   wrapperStyle,
// }: IAnimatedToast) => (
//   <View style={[styles.toastView, styles.errorToastContainer, wrapperStyle]}>
//     <ErrorExclamationTriangle />
//     <Text
//       style={[styles.toastText, styles.errorText]}
//       testID={`${accessibilityTestID.animatedToast.toastMessage}_${testID}`}
//       accessibilityLabel={`${accessibilityTestID.animatedToast.toastMessage}_${testID}`}>
//       {message}
//     </Text>
//     {showCloseButton && (
//       <Pressable onPress={Toast.hide} hitSlop={ICON_BUTTON_HITSLOP}>
//         <CloseIconSmall
//           width={ms(16)}
//           height={ms(16)}
//           style={styles.closeIcon}
//         />
//       </Pressable>
//     )}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 16,
//     zIndex: 999,
//   },
//   message: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default Toast;
