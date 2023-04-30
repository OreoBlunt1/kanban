import React from 'react';
import classes from './DateInput.module.css';
import { DatePicker } from '@mui/x-date-pickers';

export default function DateInput({ onDateChange, onKeyDown }) {
	return (
		<div className={classes.DateInput}>
			<h1>Дедлайн</h1>
			<DatePicker
				slotProps={{
					popper: { placement: 'bottom-end' },
					desktopPaper: { sx: 'border-radius: 16px' },
					field: { onKeyDown: onKeyDown },
				}}
				format='DD/MM/YYYY'
				onChange={onDateChange}
				sx={{
					justifyContent: 'center',
					width: '100%',
					background: 'rgba(0, 0, 0, 0.04)',
					marginBottom: '32px',
					borderRadius: '8px',
					height: '52px',
					'& .MuiInputBase-colorPrimary': {
						'& fieldset': {
							border: 'none',
						},
					},
				}}
			/>
		</div>
	);
}
