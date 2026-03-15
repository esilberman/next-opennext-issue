"use client";

import { FunctionComponent, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type IconProps = {
    icon: string;
    color?: string; // Hex color code or CSS variable like var(--name)
    size?: number; // Size in pixels
    onClick?: () => void;
    className?: string; // ClassName prop for CSS sizing
};

async function fetchSvgContent(icon: string): Promise<string> {
    const response = await fetch(`/icons/icon-${icon}.svg`);
    if (!response.ok) {
        throw new Error('Icon not found');
    }
    return await response.text();
}

const Icon: FunctionComponent<IconProps> = ({ icon, color = 'currentColor', size, onClick = () => {}, className }) => {
    const [svgContent, setSvgContent] = useState('');

    const doOnClick = () => {
        onClick();
    };

    useEffect(() => {
        fetchSvgContent(icon).then(svg => {
            let updatedSvg = svg;
            
            // Remove explicit width/height from the inner SVG tag so it scales with CSS
            updatedSvg = updatedSvg.replace(/<svg([^>]*)(width="[^"]*"|height="[^"]*")([^>]*)/g, (match, p1, p2, p3) => {
                let cleaned = match.replace(/width="[^"]*"/g, '').replace(/height="[^"]*"/g, '');
                return cleaned.replace(/<svg/, '<svg');
            });

            setSvgContent(updatedSvg);
        }).catch(() => {
            console.error(`Icon ${icon} not found`);
            setSvgContent(''); 
        });
    }, [icon]); // Removed color from dependency as we handle it via CSS now

    const isRotating = icon === 'loading';

    const sizeStyle = size !== undefined && !className ? { 
        height: `${size}px`,
        width: `${size}px`,
        minHeight: `${size}px`,
        minWidth: `${size}px`,
    } : {};

    const defaultSizingClass = size === undefined && !className ? "h-full w-full" : "";

    return (
        <div 
            onClick={doOnClick} 
            id='icon-wrapper'
            className={cn(
                "inline-flex items-center justify-center align-middle",
                "select-none touch-none",
                isRotating && "animate-spin",
                defaultSizingClass,
                className
            )}
            style={{
                ...sizeStyle, 
                color: color, // Set the color on the wrapper
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            <div 
                dangerouslySetInnerHTML={{ __html: svgContent }} 
                // Use CSS selectors to force the internal SVG paths to use the 'color' from the parent
                className={cn(
                    "flex items-center justify-center h-full w-full",
                    "[&_svg]:h-full [&_svg]:w-full [&_svg]:pointer-events-none",
                    "[&_svg_path]:fill-[currentColor] [&_svg_rect]:fill-[currentColor] [&_svg_circle]:fill-[currentColor]",
                    "[&_svg_path]:stroke-[currentColor] [&_svg_rect]:stroke-[currentColor] [&_svg_circle]:stroke-[currentColor]",
                    // If your SVG specifically uses strokes and not fills, you might need to adjust these 
                    // but currentColor is the most reliable way to pass var() values.
                )}
            />
        </div>
    );
};

export default Icon;