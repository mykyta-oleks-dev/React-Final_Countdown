import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
	const targetTimeMs = targetTime * 1000;
	const [remainingTime, setRemainingTime] = useState(targetTimeMs);

	const timerIsActive = remainingTime > 0 && remainingTime < targetTimeMs;

	const timer = useRef(null);
	const dialog = useRef(null);

	const handleReset = () => {
		setRemainingTime(targetTimeMs);
	};

	if (remainingTime <= 0) {
		dialog.current.open();
		clearInterval(timer.current);
	}

	const handleStart = () => {
		const interval = 10;

		timer.current = setInterval(() => {
			setRemainingTime((time) => time - interval);
		}, interval);
	};

	const handleStop = () => {
		dialog.current.open();
		clearInterval(timer.current);
	};

	return (
		<>
			<ResultModal
				ref={dialog}
				targetTime={targetTime}
				remainingTime={remainingTime}
				onReset={handleReset}
			/>
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? 's' : ''}
				</p>
				<p>
					<button
						type="button"
						onClick={timerIsActive ? handleStop : handleStart}
					>
						{timerIsActive ? 'Stop' : 'Start'} Challenge
					</button>
				</p>
				<p>
					{timerIsActive ? 'Timer is running...' : 'Timer inactive'}
				</p>
			</section>
		</>
	);
};

export default TimerChallenge;
