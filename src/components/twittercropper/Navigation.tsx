import React, { FC } from 'react';
import cn from 'classnames';
import { ZoomInIcon } from './icon/ZoomInIcon';
import { ZoomOutIcon } from './icon/ZoomOutIcon';
import { Slider } from './Slider';
import './Navigation.scss';

interface Props {
	zoom?: number;
	onZoom?: (value: number, transitions?: boolean) => void;
	className?: string;
	disabled?: unknown;
}

export const Navigation: FC<Props> = ({ className, onZoom, zoom }) => {
	return (
		<div className={cn('twitter-cropper-navigation', className)}>
			<div className={'twitter-cropper-navigation__wrapper'}>
				<div className="twitter-cropper-navigation__zoom-icon">
                <ZoomInIcon />
				</div>
				<Slider value={zoom} onChange={onZoom} className="twitter-cropper-navigation__slider" />
				<div className="twitter-cropper-navigation__zoom-icon">
					
                <ZoomOutIcon />
				</div>
			</div>
		</div>
	);
};